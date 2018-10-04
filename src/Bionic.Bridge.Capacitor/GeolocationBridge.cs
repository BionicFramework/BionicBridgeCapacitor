using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class GeolocationBridge {
        private static Dictionary<string, Action<GeolocationPosition>> watchers =
            new Dictionary<string, Action<GeolocationPosition>>();

        private const string GeolocationGetCurrentPositionFunctionName =
            "BionicBridge.Capacitor.Geolocation.getCurrentPosition";

        private const string GeolocationClearWatchFunctionName = "BionicBridge.Capacitor.Geolocation.clearWatch";
        private const string GeolocationWatchPositionFunctionName = "BionicBridge.Capacitor.Geolocation.watchPosition";

        public static Task<GeolocationPosition> GetCurrentPosition(GeolocationOptions options = null) {
            return JSRuntime.Current.InvokeAsync<GeolocationPosition>(GeolocationGetCurrentPositionFunctionName, options);
        }

        public static async Task<string>
            WatchPosition(GeolocationOptions options, Action<GeolocationPosition> callback) {
            var id = await JSRuntime.Current.InvokeAsync<string>(GeolocationWatchPositionFunctionName, options);
            watchers.Add(id, callback);
            return id;
        }

        public static Task ClearWatch(string watcherId) {
            watchers.Remove(watcherId);
            return JSRuntime.Current.InvokeAsync<object>(GeolocationClearWatchFunctionName, watcherId);
        }

        [JSInvokable]
        public static void ReportNewPosition(string watcherId, GeolocationPosition newPosition) {
            watchers[watcherId](newPosition);
        }
    }

    public class GeolocationOptions {
        public bool enableHighAccuracy;
        public long maximumAge;
        public bool requireAltitude;
        public long timeout;
    }

    public class GeolocationPosition {
        public Coordinates coords;
        public long timestamp;
    }

    public class Coordinates {
        public double latitude;
        public double longitude;
        public double accuracy;
        public double? altitude;
        public double? altitudeAccuracy;
        public double? speed;
        public double? heading;
    }
}