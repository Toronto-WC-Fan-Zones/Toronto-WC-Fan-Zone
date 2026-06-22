import { HomeDashboard } from "@/components/dashboard/HomeDashboard";
import {
  getAllFanZones,
  getAllHotspots,
  getAllAreas,
  getAllEvents,
} from "@/lib/data";

export default function HomePage() {
  const fanZones = getAllFanZones();
  const hotspots = getAllHotspots();
  const areas = getAllAreas();
  const events = getAllEvents();

  return (
    <HomeDashboard
      fanZones={fanZones}
      hotspots={hotspots}
      areas={areas}
      events={events}
    />
  );
}
