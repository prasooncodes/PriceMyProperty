import FlatData from "../db/FlatModel.js";

// Master seed function to insert demo data
export const seedFlats = async (req, res) => {
	try {
		const flats = [
			{
				PROPERTY_TYPE: "Penthouse",
				SOCIETY_NAME: "Skyline Towers",
				CITY: "Gurugram",
				location: "Golf Course Road",
				BEDROOM_NUM: 4,
				BALCONY_NUM: 3,
				AREA: 2800,
				Price_per_sqft: 9800,
				PRICE: 27440000,
				AGE: "0-2 years",
				FURNISH: "Fully-Furnished",
				amenity_luxury: "Ultra-Luxury",
				FLOOR_NUM: "20",
				LATITUDE: 28.4595,
				LONGITUDE: 77.0266,
				TOTAL_FLOOR: 25,
				DESCRIPTION:
					"Luxurious 4 BHK penthouse with private terrace and skyline view.",
				Facing_Direction: "North-East",
				Image: "https://example.com/images/flat2.jpg",
				Loan_Availability: true,
				Estimated_Monthly_EMI: 210000,
				Maintenance_Fees: 8500,
				Property_Tax: 32000,
				Stamp_Duty_Registration_Costs: 750000,
				Nearest_Schools: {
					name: "GD Goenka Public School",
					distance: 2.3,
				},
				Nearest_Colleges: {
					name: "IILM University",
					distance: 6.7,
				},
				Nearest_Hospitals: {
					name: "Medanta Hospital",
					distance: 3.8,
				},
				Nearest_Markets: {
					name: "South Point Mall",
					distance: 1.5,
				},
				Nearest_Public_Transport: {
					name: "Rapid Metro Station",
					distance: 0.6,
				},
				Nearest_Restaurants: {
					name: "Indian Accent",
					distance: 1.9,
				},
				Nearest_Railway_Stations: {
					name: "Gurugram Railway Station",
					distance: 10.2,
				},
				Nearest_Malls: {
					name: "Ambience Mall",
					distance: 4.1,
				},
				Swimming_Pool: true,
				Playground: true,
				RERA_Registration_Number: 9876543210,
				"24x7_Security": true,
				Visitor_Parking: true,
				Intercom_Facility: true,
				Power_Backup: true,
				Water_Supply: "24 Hours",
				Pet_Friendly: false,
				Fire_Safety_Installed: true,
			},
			{
				PROPERTY_TYPE: "Apartment",
				SOCIETY_NAME: "Greenwood Residency",
				CITY: "Noida",
				location: "Sector 75, Noida",
				BEDROOM_NUM: 3,
				BALCONY_NUM: 2,
				AREA: 1500,
				Price_per_sqft: 6500,
				PRICE: 9750000,
				AGE: "5-10 years",
				FURNISH: "Semi-Furnished",
				amenity_luxury: "Premium",
				FLOOR_NUM: "7",
				LATITUDE: 28.567,
				LONGITUDE: 77.389,
				TOTAL_FLOOR: 15,
				DESCRIPTION:
					"Spacious 3 BHK apartment with park-facing view and modern amenities.",
				Facing_Direction: "East",
				Image: "https://example.com/images/flat1.jpg",
				Loan_Availability: true,
				Estimated_Monthly_EMI: 75000,
				Maintenance_Fees: 3500,
				Property_Tax: 12000,
				Stamp_Duty_Registration_Costs: 250000,
				Nearest_Schools: {
					name: "Delhi Public School",
					distance: 1.5,
				},
				Nearest_Colleges: {
					name: "Amity University",
					distance: 8.0,
				},
				Nearest_Hospitals: {
					name: "Fortis Hospital",
					distance: 3.2,
				},
				Nearest_Markets: {
					name: "Spice Mall Market",
					distance: 2.0,
				},
				Nearest_Public_Transport: {
					name: "Sector 76 Metro Station",
					distance: 0.8,
				},
				Nearest_Restaurants: {
					name: "Barbeque Nation",
					distance: 1.2,
				},
				Nearest_Railway_Stations: {
					name: "Anand Vihar Railway Station",
					distance: 12.5,
				},
				Nearest_Malls: {
					name: "DLF Mall of India",
					distance: 5.0,
				},
				Swimming_Pool: true,
				Playground: true,
				RERA_Registration_Number: 1234567890,
				"24x7_Security": true,
				Visitor_Parking: true,
				Intercom_Facility: true,
				Power_Backup: true,
				Water_Supply: "24 Hours",
				Pet_Friendly: true,
				Fire_Safety_Installed: true,
			},
			{
				PROPERTY_TYPE: "Villa",
				SOCIETY_NAME: "Palm Meadows",
				CITY: "Bengaluru",
				location: "Whitefield",
				BEDROOM_NUM: 5,
				BALCONY_NUM: 4,
				AREA: 3500,
				Price_per_sqft: 7200,
				PRICE: 25200000,
				AGE: "2-5 years",
				FURNISH: "Unfurnished",
				amenity_luxury: "High-End",
				FLOOR_NUM: "Ground + 2",
				LATITUDE: 12.9716,
				LONGITUDE: 77.5946,
				TOTAL_FLOOR: 3,
				DESCRIPTION:
					"Independent villa with private garden, home theatre, and modern interiors.",
				Facing_Direction: "West",
				Image: "https://example.com/images/flat3.jpg",
				Loan_Availability: false,
				Estimated_Monthly_EMI: 185000,
				Maintenance_Fees: 6000,
				Property_Tax: 28000,
				Stamp_Duty_Registration_Costs: 500000,
				Nearest_Schools: {
					name: "Ryan International School",
					distance: 1.0,
				},
				Nearest_Colleges: {
					name: "Christ University",
					distance: 12.5,
				},
				Nearest_Hospitals: {
					name: "Manipal Hospital",
					distance: 4.5,
				},
				Nearest_Markets: {
					name: "Forum Value Mall",
					distance: 2.8,
				},
				Nearest_Public_Transport: {
					name: "Whitefield Metro Station",
					distance: 1.2,
				},
				Nearest_Restaurants: {
					name: "Mainland China",
					distance: 2.0,
				},
				Nearest_Railway_Stations: {
					name: "KR Puram Railway Station",
					distance: 9.4,
				},
				Nearest_Malls: {
					name: "Phoenix Marketcity",
					distance: 6.0,
				},
				Swimming_Pool: true,
				Playground: true,
				RERA_Registration_Number: 1122334455,
				"24x7_Security": true,
				Visitor_Parking: true,
				Intercom_Facility: false,
				Power_Backup: true,
				Water_Supply: "Cauvery Water Supply",
				Pet_Friendly: true,
				Fire_Safety_Installed: true,
			},
			{
				PROPERTY_TYPE: "Studio Apartment",
				SOCIETY_NAME: "Urban Nest",
				CITY: "Pune",
				location: "Hinjewadi Phase 1",
				BEDROOM_NUM: 1,
				BALCONY_NUM: 1,
				AREA: 600,
				Price_per_sqft: 5200,
				PRICE: 3120000,
				AGE: "0-1 year",
				FURNISH: "Semi-Furnished",
				amenity_luxury: "Basic",
				FLOOR_NUM: "5",
				LATITUDE: 18.5916,
				LONGITUDE: 73.7389,
				TOTAL_FLOOR: 12,
				DESCRIPTION:
					"Compact studio apartment ideal for working professionals near IT park.",
				Facing_Direction: "South",
				Image: "https://example.com/images/flat4.jpg",
				Loan_Availability: true,
				Estimated_Monthly_EMI: 25000,
				Maintenance_Fees: 2000,
				Property_Tax: 8000,
				Stamp_Duty_Registration_Costs: 120000,
				Nearest_Schools: {
					name: "Blue Ridge Public School",
					distance: 0.9,
				},
				Nearest_Colleges: {
					name: "MIT College",
					distance: 9.0,
				},
				Nearest_Hospitals: {
					name: "Lifepoint Hospital",
					distance: 1.7,
				},
				Nearest_Markets: {
					name: "Vision One Mall",
					distance: 2.4,
				},
				Nearest_Public_Transport: {
					name: "Hinjewadi Metro Station",
					distance: 0.5,
				},
				Nearest_Restaurants: {
					name: "Cafe Peter",
					distance: 0.8,
				},
				Nearest_Railway_Stations: {
					name: "Pune Railway Station",
					distance: 16.0,
				},
				Nearest_Malls: {
					name: "Xion Mall",
					distance: 2.0,
				},
				Swimming_Pool: false,
				Playground: true,
				RERA_Registration_Number: 5566778899,
				"24x7_Security": true,
				Visitor_Parking: false,
				Intercom_Facility: true,
				Power_Backup: true,
				Water_Supply: "24 Hours",
				Pet_Friendly: true,
				Fire_Safety_Installed: true,
			},
		];

		// clear old data first
		await FlatData.deleteMany({});
		const inserted = await FlatData.insertMany(flats);

		res.status(201).json({
			message: "All data seeded successfully",
			result: inserted,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
};
