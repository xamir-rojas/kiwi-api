type Delivery = {
  id?: string;
  creation_date?: Date;
  state: "pending" | "assigned" | "in_transit" | "delivered";
  pickup: {
    pickup_lat: number;
    pickup_lon: number;
  };

  dropoff: {
    dropoff_lat: number;
    dropoff_lon: number;
  };
  zone_id: string;
};

type Bot = {
  id?: string;
  status: "available" | "busy" | "reserved";
  location: {
    dropoff_lat: number;
    dropoff_lon: number;
  };
  zone_id: string;
};

export { Delivery,Bot};