# Development Notes

## Debug Build

```bash
dotnet build
```

## Building release from the command line:

```bash
dotnet build -c Release /p:SourceLinkCreate=true /p:VersionSuffix= /p:OfficialBuild=true
```

## Creating packages from command line:

```bash
dotnet pack -c Release /p:SourceLinkCreate=true /p:VersionSuffix= /p:OfficialBuild=true
```

# Testing

## Open test in Android

```bash
bionic platform capacitor android build
bionic platform capacitor android open
```

And use test app to test bridge

## Update Bionic Capacitor Plugin

To update BionicCapacitorPlugin in test app do:

```bash
cd test/Bionic.Bridge.Capacitor.Test
rm -Rf .bionic/BionicPlugin/ .bionic/BionicCapacitorPlugin/
nuget install BionicPlugin -DirectDownload -ExcludeVersion -PackageSaveMode nuspec -o .bionic
nuget install BionicCapacitorPlugin -DirectDownload -ExcludeVersion -PackageSaveMode nuspec -o .bionic
```

Check new version using:

```bash
bionic platform capacitor -v
```