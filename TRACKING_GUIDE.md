# GPS Campaign Tracking System - User Guide

## Overview
MotionFleet now features real-time GPS tracking for campaigns, allowing businesses to monitor their fleet vehicles and track campaign performance with live data.

## System Components

### 1. Campaign Tracking Dashboard (`/tracking`)
**For Business Clients**

Features:
- **Live Map View**: Real-time vehicle positions on an interactive Mapbox map
- **Campaign Metrics**: Active vehicles, coverage area, estimated impressions, total distance
- **Campaign Filters**: Filter vehicles by specific campaigns
- **Vehicle List**: View all active vehicles with their campaign assignments
- **Real-time Updates**: Automatic updates when vehicles move

How to use:
1. Navigate to `/tracking` or click "Track Live" from the homepage
2. Enter your Mapbox public token (get one free at https://mapbox.com)
3. Select a campaign from the filter dropdown
4. View live vehicle positions and click markers for details
5. Monitor real-time metrics and vehicle movements

### 2. Driver Tracking Interface (`/driver-tracking`)
**For Drivers**

Features:
- **Location Sharing**: Share GPS location in real-time
- **Campaign Assignment**: View assigned campaign details
- **Tracking Status**: See active tracking status
- **Easy Controls**: Start/stop tracking with one button

How to use (for drivers):
1. Navigate to `/driver-tracking` (can add `?vehicleId=xxx` if already registered)
2. For new drivers: Enter your name and phone number
3. Click "Start Tracking" to begin sharing location
4. Keep the app open while driving
5. Click "Stop Tracking" when your shift ends

## Database Structure

### Tables Created:
1. **campaigns**: Store business campaign information
2. **vehicles**: Track vehicles and driver details
3. **gps_tracking**: Store GPS coordinates with timestamps
4. **campaign_metrics**: Aggregate daily metrics for campaigns

### Real-time Features:
- WebSocket connections for live updates
- Automatic marker updates on the map
- Real-time metrics calculation

## Setup Instructions

### For Businesses:
1. Create a campaign in the database
2. Assign vehicles to the campaign
3. Share the driver tracking link with drivers
4. Monitor campaigns at `/tracking`

### For Drivers:
1. Register through the driver tracking page
2. Get assigned to a campaign
3. Enable location services on your device
4. Start tracking when you begin your shift

## Mapbox Setup

To enable the map visualization:

1. Go to https://mapbox.com
2. Sign up for a free account
3. Create a new token or copy your default public token
4. Paste the token in the tracking dashboard

**Note**: The Mapbox free tier includes:
- 50,000 free map loads per month
- Unlimited map views
- Suitable for testing and small deployments

## Sample Data

Sample campaigns and vehicles have been added to demonstrate the system:
- **TechBrand India**: Product Launch Campaign
- **Local Cafe Chain**: New Menu Promotion

## Mobile App Options

The driver tracking interface is mobile-optimized and works on any smartphone browser. For a native mobile app experience:

### Option 1: Progressive Web App (PWA) - Recommended for most users
- Works on all phones (iPhone and Android)
- Can be installed to home screen
- No app store submission needed
- Faster to deploy

### Option 2: Native Mobile App with Capacitor
- Full access to device features
- Can be published to app stores
- Requires more technical setup
- Best for production deployments

## Security & Privacy

- RLS policies are configured for data access control
- Location data is only shared when tracking is active
- Businesses can only view their assigned vehicles
- GPS accuracy varies based on device and environment

## Next Steps

1. **Add Authentication**: Implement user authentication to restrict access
2. **Role Management**: Create admin/business/driver roles
3. **Payment Integration**: Add payment tracking for drivers
4. **Route Optimization**: Suggest optimal routes for maximum coverage
5. **Analytics**: Build detailed analytics dashboard with charts
6. **Notifications**: Send alerts for campaign milestones

## Troubleshooting

**Map not loading?**
- Ensure you've entered a valid Mapbox token
- Check browser console for errors
- Verify internet connection

**Location not updating?**
- Enable location services on your device
- Allow location permissions in browser
- Check if GPS is working on your device

**No vehicles showing?**
- Ensure vehicles are assigned to campaigns
- Check if drivers have started tracking
- Verify database connections

## Technical Details

**Technologies Used:**
- React + TypeScript
- Supabase (Database + Realtime)
- Mapbox GL JS (Maps)
- Geolocation API (GPS tracking)

**Database Realtime:**
- Tables: `gps_tracking`, `vehicles`, `campaigns`
- Real-time updates via WebSocket subscriptions
- Automatic marker updates on map

**Performance:**
- GPS updates every few seconds based on device
- Efficient marker management
- Optimized database queries
