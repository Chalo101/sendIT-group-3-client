import React, { useState, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { LineString as OLLineString } from "ol/geom";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Point as PointGeom } from "ol/geom"; // Use PointGeom for accurate marker placement
import "ol/ol.css";
import axios from "axios";
import { haversineDistance } from "./utils";

const NewOrder = () => {
  const [formData, setFormData] = useState({
    parcelItem: "",
    description: "",
    weight: "",
    destination: "",
    recipientName: "",
    recipientContact: "",
  });

  const [map, setMap] = useState(null);
  const [price, setPrice] = useState(null);
  const [distance, setDistance] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const initialMap = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([36.8219, -1.2921]), // Default center to Nairobi
        zoom: 7,
      }),
    });
    setMap(initialMap);

    return () => {
      initialMap.setTarget(null);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/parcels", formData);
      setResponseMessage(response.status === 201 ? "Order created successfully" : "Failed to create order");
    } catch (error) {
      console.error("Error creating order:", error);
      setResponseMessage("Failed to create order");
    }
  };

  const handleSearch = async () => {
    const destination = formData.destination;

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
      );
      if (response.data.length > 0) {
        const place = response.data[0];
        const coordinates = [parseFloat(place.lon), parseFloat(place.lat)];

        if (map) {
          map.getView().setCenter(fromLonLat(coordinates));
          map.getView().setZoom(10);

          map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
              map.removeLayer(layer);
            }
          });

          const lineFeature = new Feature({
            geometry: new OLLineString([
              fromLonLat([36.8219, -1.2921]),
              fromLonLat(coordinates),
            ]),
          });

          const lineStyle = new Style({
            stroke: new Stroke({
              color: "#4B0082", // Darker purple for the line
              width: 4,
            }),
          });

          lineFeature.setStyle(lineStyle);

          const vectorSource = new VectorSource({
            features: [lineFeature],
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource,
          });

          map.addLayer(vectorLayer);

          const originMarker = new Feature({
            geometry: new PointGeom(fromLonLat([36.8219, -1.2921])),
          });

          const destinationMarker = new Feature({
            geometry: new PointGeom(fromLonLat(coordinates)),
          });

          const markerStyle = new Style({
            image: new CircleStyle({
              radius: 6, // This will be half the size of 12
              fill: new Fill({ color: "#7F00FF" }), // Purple
              stroke: new Stroke({ color: "#000000", width: 2 }),
            }),
          });

          originMarker.setStyle(markerStyle);
          destinationMarker.setStyle(markerStyle);

          const markerSource = new VectorSource({
            features: [originMarker, destinationMarker],
          });

          const markerLayer = new VectorLayer({
            source: markerSource,
          });

          map.addLayer(markerLayer);

          const distance = haversineDistance([36.8219, -1.2921], coordinates);
          setDistance(distance);

          const weight = parseFloat(formData.weight);
          const calculatedPrice = calculatePrice(weight, distance);
          setPrice(calculatedPrice);
        }
      } else {
        console.log("No results found for the destination.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const calculatePrice = (weight, distance) => {
    const basePrice = 500;
    const weightCost = weight * 100;
    const distanceCost = distance * 50;
    return basePrice + weightCost + distanceCost;
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ flex: 1, marginRight: "20px" }}>
        <h1>New Order</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Parcel Item:
            <input
              type="text"
              name="parcelItem"
              value={formData.parcelItem}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Weight (kg):
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Destination:
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: "#4B0082",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleSearch}
            style={{
              backgroundColor: "#4B0082",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginLeft: "10px",
            }}
          >
            Search Destination
          </button>
        </form>
      </div>

      <div style={{ flex: 1 }}>
        <h2>Recipient Details</h2>
        <form>
          <label>
            Recipient Name:
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Recipient Contact:
            <input
              type="text"
              name="recipientContact"
              value={formData.recipientContact}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <p>{responseMessage}</p>
        </form>

        <div
          id="map"
          style={{ width: "100%", height: "200px", marginTop: "20px" }}
        ></div>

        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <button
            style={{
              backgroundColor: "#4B0082",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            Checkout
          </button>
          {price !== null && (
            <div
              style={{
                color: "#6A0D91",
                fontSize: "18px",
                marginRight: "10px",
              }}
            >
              Estimated Price: KES {price.toFixed(2)}
            </div>
          )}
          {distance !== null && (
            <div style={{ color: "#6A0D91", fontSize: "18px" }}>
              Distance: {distance.toFixed(2)} km
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
