﻿using System;
using Caliburn.Micro;
using Sharp.Ballistics.Abstractions;
using Sharp.Ballistics.Calculator.Models;
using System.Linq;
using System.Collections.Generic;
using UnitsNet;
using System.Windows;
using System.Windows.Input;

namespace Sharp.Ballistics.Calculator.ViewModels
{
    public class EditCartridgeViewModel : Screen
    {
        private readonly AmmoModel cartridgesModel;
        private readonly UnitSettings units;
        private const double Epsilon = 0.01;
        private bool isCanceling;
        private readonly bool isNew;
        public Cartridge Cartridge { get; private set; }

        public EditCartridgeViewModel(ConfigurationModel configurationModel, 
                                      AmmoModel cartridgesModel,
                                      Cartridge cartridgeToEdit = null)
        {
            Cartridge = cartridgeToEdit ?? new Cartridge();
            isNew = cartridgeToEdit == null;
            configurationModel.Initialize();
            units = configurationModel.Units;
            DisplayName = "Cartridge Data";
            this.cartridgesModel = cartridgesModel;
        }

        public UnitSettings Units => units;        

        public IEnumerable<dynamic> Errors { get; set; }

        public string Name
        {
            get
            {
                return Cartridge.Name;
            }
            set
            {
                Cartridge.Name = value;
                NotifyOfPropertyChange(() => Name);
            }
        }       

        public double BC
        {
            get
            {
                return Cartridge.BC;
            }
            set
            {
                Cartridge.BC = value;
                NotifyOfPropertyChange(() => BC);
            }
        }

        public double Length
        {
            get
            {
                return Cartridge.Length.As(units.BulletOffsets);
            }
            set
            {
                Cartridge.Length = UnitsNet.Length.From(value, units.BulletOffsets);
                NotifyOfPropertyChange(() => Length);
            }
        }

        public double Caliber
        {
            get
            {
                return Cartridge.Caliber.As(units.Caliber);
            }
            set
            {
                Cartridge.Caliber = UnitsNet.Length.From(value, units.Caliber);
                NotifyOfPropertyChange(() => Caliber);
            }
        }

        public double MuzzleVelocity
        {
            get
            {
                return Cartridge.MuzzleVelocity.As(units.MuzzleSpeed);
            }
            set
            {
                Cartridge.MuzzleVelocity = Speed.From(value, units.MuzzleSpeed);
                NotifyOfPropertyChange(() => MuzzleVelocity);
            }
        }

        public IEnumerable<DragFunction> DragFunctions => 
            Enum.GetValues(typeof(DragFunction)).Cast<DragFunction>();

        public DragFunction SelectedDragFunction
        {
            get
            {
                return Cartridge.DragFunction;
            }
            set
            {
                Cartridge.DragFunction = value;
                NotifyOfPropertyChange(() => SelectedDragFunction);
            }
        }

        public Dictionary<string, bool> ValidationErrors { get; set; } = new Dictionary<string, bool>();

        public bool HasErrors => string.IsNullOrWhiteSpace(Name) || ValidationErrors.Any(x => x.Value);

        public override void CanClose(Action<bool> callback)
        {
            var cartridgeWithTheSameName = cartridgesModel.ByName(Cartridge.Name);
            if (cartridgeWithTheSameName != null && !isCanceling && isNew) 
            {
                MessageBox.Show("Cartridge with the same name already exists.",
                   "Warning", MessageBoxButton.OK, MessageBoxImage.Exclamation);
                callback?.Invoke(false);
            }
            else if (HasErrors && !isCanceling)
            {
                MessageBox.Show("Please fill-out all fields for the cartridge before saving",
                   "Warning", MessageBoxButton.OK, MessageBoxImage.Exclamation);
                callback?.Invoke(false);
            }
            else
                callback?.Invoke(true);
        }

        public void KeyPressed(Key key)
        {
            if (key == Key.Enter)
                Save();
            else if (key == Key.Escape)
                Cancel();
        }

        public void Save()
        {
            TryClose(true);
        }

        public void Cancel()
        {
            isCanceling = true;
            TryClose(false);
        }            
    }
}
