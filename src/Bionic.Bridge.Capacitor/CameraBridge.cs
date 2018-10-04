using System;
using System.Threading.Tasks;
using Microsoft.JSInterop;
using static Bionic.Bridge.Capacitor.CameraSource;

namespace Bionic.Bridge.Capacitor {
    public static class CameraBridge {
        private const string CameraGetPhotoFunctionName = "BionicBridge.Capacitor.Camera.getPhoto";

        public static Task<CameraPhoto> GetPhoto(CameraOptions options) {
            var opts = new InternalCameraOptions {
                quality = options.quality,
                allowEditing = options.allowEditing,
                resultType = options.resultType == CameraResultType.Uri ? "uri" : "base64",
                saveToGallery = options.saveToGallery,
                width = options.width,
                height = options.height,
                correctOrientation = options.correctOrientation,
                source = CameraSourceToString(options.source)
            };

            return JSRuntime.Current.InvokeAsync<CameraPhoto>(CameraGetPhotoFunctionName, opts);
        }

        private static string CameraSourceToString(CameraSource source) {
            switch (source) {
                case Prompt:
                    return "PROMPT";
                case Photos:
                    return "PHOTOS";
                case Camera:
                    return "CAMERA";
                default:
                    throw new ArgumentOutOfRangeException(nameof(source), source, null);
            }
        }
    }

    internal class InternalCameraOptions {
        public int quality;
        public bool allowEditing;
        public string resultType;
        public bool saveToGallery;
        public int width;
        public int height;
        public bool correctOrientation;
        public string source;
    }
}