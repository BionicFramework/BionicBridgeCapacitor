using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class HapticsBridge {
        private const string HapticsVibrateFunctionName = "BionicBridge.Capacitor.Haptics.vibrate";
        private const string HapticsImpactFunctionName = "BionicBridge.Capacitor.Haptics.impact";
        private const string HapticsSelectionStartFunctionName = "BionicBridge.Capacitor.Haptics.selectionStart";
        private const string HapticsSelectionChangedFunctionName = "BionicBridge.Capacitor.Haptics.selectionChanged";
        private const string HapticsSelectionEndFunctionName = "BionicBridge.Capacitor.Haptics.selectionEnd";

        public static Task Vibrate() =>
            JSRuntime.Current.InvokeAsync<object>(HapticsVibrateFunctionName);

        public static Task Impact(HapticsImpactStyle style) =>
            JSRuntime.Current.InvokeAsync<object>(HapticsImpactFunctionName, style);

        public static Task SelectionStart() =>
            JSRuntime.Current.InvokeAsync<object>(HapticsSelectionStartFunctionName);

        public static Task SelectionChanged() =>
            JSRuntime.Current.InvokeAsync<object>(HapticsSelectionChangedFunctionName);

        public static Task SelectionEnd() =>
            JSRuntime.Current.InvokeAsync<object>(HapticsSelectionEndFunctionName);
    }

    public enum HapticsImpactStyle {
        Heavy,
        Medium,
        Light
    }
}