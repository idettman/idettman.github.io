using UnitsNet;
using UnitsNet.Units;

namespace Sharp.Ballistics.Calculator
{
    public class CaliberValueConverter : FieldValueConverter<LengthUnit, Length>
    {
        protected override LengthUnit GetRelevantUnitType()
        {
            return Units.Caliber;
        }
    }
}
