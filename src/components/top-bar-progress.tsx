import { useNavigation } from "react-router-dom";
import TopBar from "react-topbar-progress-indicator";

TopBar.config({
  barColors: {
    "0": "#f6c973",
    "1.0": "#f6c973",
  },
  barThickness: 5,
  shadowBlur: 2,
});

export function TopBarProgress() {
  const { state } = useNavigation();

  return <>{state === "loading" && <TopBar />}</>;
}
