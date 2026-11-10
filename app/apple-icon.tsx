import { ImageResponse } from "next/og";

// Home-screen icon for iOS: the same white H on accent blue as app/icon.svg.
// iOS rounds the corners itself, so the background is a full square.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#1F4E9E",
      }}
    >
      <svg width="180" height="180" viewBox="0 0 64 64">
        <path fill="#FFFFFF" d="M19 17h8v12h10V17h8v30h-8V36H27v11h-8z" />
      </svg>
    </div>,
    size,
  );
}
