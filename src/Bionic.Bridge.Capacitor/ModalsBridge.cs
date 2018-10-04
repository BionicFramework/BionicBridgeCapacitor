using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace Bionic.Bridge.Capacitor {
    public static class ModalsBridge {
        private const string ModalsAlertFunctionName = "BionicBridge.Capacitor.Modals.alert";
        private const string ModalsConfirmFunctionName = "BionicBridge.Capacitor.Modals.confirm";
        private const string ModalsPromptFunctionName = "BionicBridge.Capacitor.Modals.prompt";
        private const string ModalsShowActionsFunctionName = "BionicBridge.Capacitor.Modals.showActions";

        public static Task Alert(AlertOptions options) =>
            JSRuntime.Current.InvokeAsync<object>(ModalsAlertFunctionName, options);

        public static Task<ConfirmResult> Confirm(ConfirmOptions options) =>
            JSRuntime.Current.InvokeAsync<ConfirmResult>(ModalsConfirmFunctionName, options);

        public static Task<PromptResult> Prompt(PromptOptions options) =>
            JSRuntime.Current.InvokeAsync<PromptResult>(ModalsPromptFunctionName, options);

        public static Task<ActionSheetResult> ShowActions(ActionSheetOptions options) =>
            JSRuntime.Current.InvokeAsync<ActionSheetResult>(ModalsShowActionsFunctionName, options);
    }

    public class AlertOptions {
        public string title;
        public string message;
        public string buttonTitle;
    }

    public class ConfirmOptions {
        public string title;
        public string message;
        public string okButtonTitle;
        public string cancelButtonTitle;
    }

    public class ConfirmResult {
        public bool value;
    }

    public class PromptOptions {
        public string title;
        public string message;
        public string okButtonTitle;
        public string cancelButtonTitle;
        public string inputPlaceholder;
    }

    public class PromptResult {
        public bool cancelled;
        public string value;
    }

    public class ActionSheetOptions {
        public string title;
        public string message;
        public ActionSheetOption[] options;
    }

    public class ActionSheetOption {
        public string title;
        public string style;
        public string icon;
    }

    public class ActionSheetResult {
        public long index;
    }

    public static class ActionSheetOptionStyle {
        public static string Default = "DEFAULT";
        public static string Destructive = "DESTRUCTIVE";
        public static string Cancel = "CANCEL";
    }
}