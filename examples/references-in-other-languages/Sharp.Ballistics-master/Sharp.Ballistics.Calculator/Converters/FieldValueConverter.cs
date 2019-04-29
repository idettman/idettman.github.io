﻿using Dynamitey;
using Sharp.Ballistics.Calculator.Bootstrap;
using Sharp.Ballistics.Calculator.Models;
using System;
using System.Globalization;
using System.Windows;
using System.Windows.Data;

namespace Sharp.Ballistics.Calculator
{
    public abstract class FieldValueConverter<UnitType,UnitValueType> : IValueConverter
        where UnitType : struct, IComparable, IFormattable
    {
        protected UnitSettings Units => configurationModel.Units;
        private readonly ConfigurationModel configurationModel;
        private static DependencyObject designModeIndicator = new DependencyObject();

        protected FieldValueConverter()
        {
            //I know, service locator is anti-pattern, couldn't think of something better here
            //For any suggestions, please don't hesitate to contact me :)
            this.configurationModel = AppBootstrapper.Container?.Resolve<ConfigurationModel>();
            this.configurationModel?.Initialize();
        }

        protected abstract UnitType GetRelevantUnitType();

        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            dynamic type = (UnitValueType)value;
            var typeAsString = type.As(GetRelevantUnitType());

            return typeAsString;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            double numeric;

            if (value == null || 
                ((value is string) &&
                string.IsNullOrWhiteSpace((string)value)))
            {
                MessageBox.Show("Could not convert value from empty string. Assuming it is equal zero.",
                    "Warning", MessageBoxButton.OK, MessageBoxImage.Warning);
                numeric = 0;
            }
            else
            {
                if (value is string)
                {
                    numeric = double.Parse((string)value);
                }
                else
                    numeric = (double)value;
            }

            var staticContext = InvokeContext.CreateStatic;
            
            var converted = Dynamic.InvokeMember(staticContext(typeof(UnitValueType)),
                        "From", numeric, GetRelevantUnitType());
            return converted;
        }
    }
}
