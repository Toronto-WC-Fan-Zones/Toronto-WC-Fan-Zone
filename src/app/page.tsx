import { HomeDashboard } from "@/components/dashboard/HomeDashboard";
import { getAllFanZones, getAllHotspots, getAllAreas } from "@/lib/data";

export default function HomePage() {
  const fanZones = getAllFanZones();
  const hotspots = getAllHotspots();
  const areas = getAllAreas();

  return (
    <HomeDashboard
      fanZones={fanZones}
      hotspots={hotspots}
      areas={areas}
    />
  );
}
