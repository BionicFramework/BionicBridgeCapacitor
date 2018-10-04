namespace Bionic.Bridge.Capacitor {
    public class CameraOptions {
        public int quality;
        public bool allowEditing;
        public CameraResultType resultType;
        public bool saveToGallery;
        public int width;
        public int height;
        public bool correctOrientation;
        public CameraSource source;
    }

    public enum CameraResultType {
        Uri,
        Base64
    }

    public enum CameraSource {
        Prompt,
        Camera,
        Photos,
    }
}