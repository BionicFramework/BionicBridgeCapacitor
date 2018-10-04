using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class MotionBridge {
        private static Dictionary<string, Action<MotionEventResult>> accelWatchers =
            new Dictionary<string, Action<MotionEventResult>>();

        private static Dictionary<string, Action<MotionOrientationEventResult>> orientationWatchers =
            new Dictionary<string, Action<MotionOrientationEventResult>>();

        private const string MotionGetOrientationFunctionName =
            "BionicBridge.Capacitor.Motion.getOrientation";

        private const string MotionAddAccelListenerFunctionName =
            "BionicBridge.Capacitor.Motion.addAccelListener";

        private const string MotionAddOrientationListenerFunctionName =
            "BionicBridge.Capacitor.Motion.addOrientationListener";

        private const string MotionRemoveListenerFunctionName =
            "BionicBridge.Capacitor.Motion.removeListener";

        private const string MotionStartWindowOrientationUpdatesFunctionName =
            "BionicBridge.Capacitor.Motion.startOrientationChangeListener";

        private const string MotionStopWindowOrientationUpdatesFunctionName =
            "BionicBridge.Capacitor.Motion.stopOrientationChangeListener";

        public static Action<int> OnOrientation;

        public static async Task<int> GetWindowOrientation() {
            return await JSRuntime.Current.InvokeAsync<int>(MotionGetOrientationFunctionName);
        }

        public static async Task AddAccelListener(string id, Action<MotionEventResult> callback) {
            if (orientationWatchers.ContainsKey(id)) throw new Exception($"Key '{id}' already in use.");
            await JSRuntime.Current.InvokeAsync<object>(MotionAddAccelListenerFunctionName, id);
            accelWatchers.Add(id, callback);
        }

        public static async Task AddOrientationListener(string id, Action<MotionOrientationEventResult> callback) {
            if (accelWatchers.ContainsKey(id)) throw new Exception($"Key '{id}' already in use.");
            await JSRuntime.Current.InvokeAsync<object>(MotionAddOrientationListenerFunctionName, id);
            orientationWatchers.Add(id, callback);
        }

        public static async Task RemoveListener(string id) {
            if (accelWatchers.ContainsKey(id)) accelWatchers.Remove(id);
            else if (orientationWatchers.ContainsKey(id)) orientationWatchers.Remove(id);
            await JSRuntime.Current.InvokeAsync<object>(MotionRemoveListenerFunctionName, id);
        }

        public static async Task StartWindowOrientationUpdates() =>
            await JSRuntime.Current.InvokeAsync<object>(MotionStartWindowOrientationUpdatesFunctionName);

        public static async Task StopWindowOrientationUpdates() =>
            await JSRuntime.Current.InvokeAsync<object>(MotionStopWindowOrientationUpdatesFunctionName);

        [JSInvokable]
        public static void ReportMotionAccel(string id, MotionEventResult result) => accelWatchers[id](result);

        [JSInvokable]
        public static void ReportMotionOrientation(string id, MotionOrientationEventResult result) =>
            orientationWatchers[id](result);

        [JSInvokable]
        public static void OnOrientationChange(int orientation) => OnOrientation?.Invoke(orientation);
    }

    public class MotionEventResult {
        public MotionCoords acceleration;
        public MotionCoords accelerationIncludingGravity;
        public MotionOrientationEventResult rotationRate;
        public long interval;
    }

    public class MotionCoords {
        public double? x;
        public double? y;
        public double? z;
    }

    public class MotionOrientationEventResult {
        public double? alpha;
        public double? beta;
        public double? gamma;
    }
}