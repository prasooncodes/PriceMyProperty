// scripts/seedData.js
import mongoose from 'mongoose';
import FlatData from '../db/FlatModel.js';
import { connectToDatabase } from '../db/db.js';
import 'dotenv/config';

// Complete sample properties data that matches your schema
const sampleProperties = [
  {
    PROPERTY_TYPE: "Apartment",
    SOCIETY_NAME: "Green Valley Apartments",
    CITY: "Mumbai",
    location: "Andheri West",
    BEDROOM_NUM: 3,
    BALCONY_NUM: 2,
    AREA: 1200,
    Price_per_sqft: 12500,
    PRICE: 15000000,
    AGE: "2 years",
    FURNISH: "Semi-Furnished",
    amenity_luxury: "Premium",
    FLOOR_NUM: "5",
    LATITUDE: 19.1364,
    LONGITUDE: 72.8296,
    TOTAL_FLOOR: 12,
    DESCRIPTION: "Luxury 3BHK apartment with modern amenities and beautiful city views",
    Facing_Direction: "East",
    Image: "https://example.com/image1.jpg",
    Loan_Availability: true,
    Estimated_Monthly_EMI: 85000,
    Maintenance_Fees: 3000,
    Property_Tax: 5000,
    Stamp_Duty_Registration_Costs: 150000,
    Nearest_Schools: { name: "ABC International School", distance: 0.5 },
    Nearest_Colleges: { name: "XYZ College", distance: 1.2 },
    Nearest_Hospitals: { name: "City Hospital", distance: 0.8 },
    Nearest_Markets: { name: "Local Market", distance: 0.3 },
    Nearest_Public_Transport: { name: "Bus Stand", distance: 0.2 },
    Nearest_Restaurants: { name: "Food Court", distance: 0.4 },
    Nearest_Railway_Stations: { name: "Andheri Station", distance: 1.5 },
    Nearest_Malls: { name: "Mega Mall", distance: 2.1 },
    Swimming_Pool: true,
    Playground: true,
    RERA_Registration_Number: 1234567890,
    '24x7_Security': true,
    Visitor_Parking: true,
    Intercom_Facility: true,
    Power_Backup: true,
    Water_Supply: "24/7 Corporation Water",
    Pet_Friendly: true,
    Fire_Safety_Installed: true,
    Contact: "+91-9876543210"
  },
  {
    PROPERTY_TYPE: "Apartment",
    SOCIETY_NAME: "Royal Palms",
    CITY: "Bangalore",
    location: "Whitefield",
    BEDROOM_NUM: 2,
    BALCONY_NUM: 1,
    AREA: 950,
    Price_per_sqft: 11500,
    PRICE: 10925000,
    AGE: "1 year",
    FURNISH: "Fully-Furnished",
    amenity_luxury: "Standard",
    FLOOR_NUM: "3",
    LATITUDE: 12.9716,
    LONGITUDE: 77.5946,
    TOTAL_FLOOR: 8,
    DESCRIPTION: "Beautiful 2BHK with premium finishes and great amenities",
    Facing_Direction: "North",
    Image: "https://example.com/image2.jpg",
    Loan_Availability: true,
    Estimated_Monthly_EMI: 62000,
    Maintenance_Fees: 2500,
    Property_Tax: 4200,
    Stamp_Duty_Registration_Costs: 120000,
    Nearest_Schools: { name: "Global Academy", distance: 0.8 },
    Nearest_Colleges: { name: "Tech College", distance: 1.5 },
    Nearest_Hospitals: { name: "Multi-speciality Hospital", distance: 1.2 },
    Nearest_Markets: { name: "Super Market", distance: 0.6 },
    Nearest_Public_Transport: { name: "Metro Station", distance: 0.4 },
    Nearest_Restaurants: { name: "Fine Dining", distance: 0.7 },
    Nearest_Railway_Stations: { name: "Whitefield Station", distance: 2.1 },
    Nearest_Malls: { name: "Phoenix Mall", distance: 3.2 },
    Swimming_Pool: false,
    Playground: true,
    RERA_Registration_Number: 9876543210,
    '24x7_Security': true,
    Visitor_Parking: true,
    Intercom_Facility: true,
    Power_Backup: true,
    Water_Supply: "24/7 Borewell Water",
    Pet_Friendly: false,
    Fire_Safety_Installed: true,
    Contact: "+91-9123456780"
  },
  {
    PROPERTY_TYPE: "Villa",
    SOCIETY_NAME: "Ocean View Residency",
    CITY: "Goa",
    location: "Calangute",
    BEDROOM_NUM: 4,
    BALCONY_NUM: 3,
    AREA: 2200,
    Price_per_sqft: 9500,
    PRICE: 20900000,
    AGE: "New Construction",
    FURNISH: "Unfurnished",
    amenity_luxury: "Luxury",
    FLOOR_NUM: "2",
    LATITUDE: 15.5439,
    LONGITUDE: 73.7553,
    TOTAL_FLOOR: 2,
    DESCRIPTION: "Beach-facing villa with private pool and garden",
    Facing_Direction: "West",
    Image: "https://example.com/image3.jpg",
    Loan_Availability: true,
    Estimated_Monthly_EMI: 115000,
    Maintenance_Fees: 5000,
    Property_Tax: 8500,
    Stamp_Duty_Registration_Costs: 250000,
    Nearest_Schools: { name: "Beachside School", distance: 1.2 },
    Nearest_Colleges: { name: "Arts College", distance: 2.5 },
    Nearest_Hospitals: { name: "Coastal Hospital", distance: 1.8 },
    Nearest_Markets: { name: "Fish Market", distance: 0.8 },
    Nearest_Public_Transport: { name: "Bus Stop", distance: 0.3 },
    Nearest_Restaurants: { name: "Beach Cafe", distance: 0.2 },
    Nearest_Railway_Stations: { name: "Thivim Station", distance: 15.2 },
    Nearest_Malls: { name: "Goa Mall", distance: 3.8 },
    Swimming_Pool: true,
    Playground: false,
    RERA_Registration_Number: 5555555555,
    '24x7_Security': true,
    Visitor_Parking: true,
    Intercom_Facility: true,
    Power_Backup: true,
    Water_Supply: "24/7 Tanker Water",
    Pet_Friendly: true,
    Fire_Safety_Installed: true,
    Contact: "+91-9988776655"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Clear existing data
    await FlatData.deleteMany({});
    console.log('Existing data cleared');
    
    // Insert sample data
    await FlatData.insertMany(sampleProperties);
    console.log('Sample data inserted successfully');
    
    // Close connection
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();