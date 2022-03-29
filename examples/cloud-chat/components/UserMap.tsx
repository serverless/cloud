import { useCallback } from "react";
import { useSnapshot } from "valtio";
import dynamic from "next/dynamic";
import users from "@state/users";
import auth from "@state/auth";

const Map = dynamic(() => import("@components/Map"), { ssr: false });

export default function UserMap() {
  const { items } = useSnapshot(users);
  const { user } = useSnapshot(auth);

  const markers = items
    .filter((item) => item.value.lat)
    .map(({ key, value }) => ({
      key,
      lat: value.lat,
      lon: value.lon,
      text: value.name,
    }));

  const handleBoundsChange = useCallback((bounds) => {
    users.setSearchBounds(bounds);
  }, []);

  if (!user.lat) {
    return null;
  }

  return (
    <Map
      zoom={10}
      markers={markers}
      height={200}
      lat={user.lat}
      lon={user.lon}
      onBoundsChange={handleBoundsChange}
    />
  );
}
