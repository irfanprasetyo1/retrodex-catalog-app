const PLATFORM_ICON_MAP = {
  playstation: "fa-brands fa-playstation",
  xbox: "fa-brands fa-xbox",
  pc: "fa-brands fa-windows",
  ios: "fa-brands fa-apple",
  android: "fa-brands fa-android",
  linux: "fa-brands fa-linux",
  mac: "fa-brands fa-apple",
};

const FALLBACK_ICON = "fa-solid fa-gamepad";

//Fungsi untuk mengembalikan string class FontAwesome (icon) berdasarkan slug platform
export function getPlatformIcon(platformSlug) {
  return PLATFORM_ICON_MAP[platformSlug] || FALLBACK_ICON;
}
