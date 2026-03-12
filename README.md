# Spatial Comfort Lab

An interactive 3D room visualization tool for exploring how spatial arrangement affects comfort. Built with React, Three.js, and Supabase.

## Features

- **3D Room Visualization**: Load and view GLB room models with arctic-style rendering
- **Interactive Navigation**: Pan, rotate, and zoom around the space
- **Furniture Manipulation**: Click to select, drag to move, rotate furniture pieces
- **Y-Axis Locking**: Furniture stays on the floor during movement
- **Rotation Snapping**: Optional 15° snap for precise rotation
- **Survey System**: Rate layouts on comfort, calm, spaciousness, tidiness, and delight
- **Multi-Page Experience**: Landing page, interactive lab, and depth estimation gallery
- **Data Persistence**: Save layouts and feedback to Supabase

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **3D Rendering**: Three.js with @react-three/fiber and @react-three/drei
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account (free tier works)

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)

2. Go to the SQL Editor and run this schema:

```sql
-- Create the layouts table
CREATE TABLE layouts (
  id BIGSERIAL PRIMARY KEY,
  layout_id UUID NOT NULL UNIQUE,
  timestamp BIGINT NOT NULL,
  objects JSONB NOT NULL DEFAULT '[]',
  lighting JSONB NOT NULL DEFAULT '{}',
  survey JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE layouts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for the app)
CREATE POLICY "Allow anonymous inserts" ON layouts
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reading own data (optional)
CREATE POLICY "Allow public read" ON layouts
  FOR SELECT
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_layouts_timestamp ON layouts(timestamp DESC);
CREATE INDEX idx_layouts_layout_id ON layouts(layout_id);
```

3. Get your credentials from Project Settings > API:
   - **Project URL** (VITE_SUPABASE_URL)
   - **anon public** key (VITE_SUPABASE_ANON_KEY)

### 3. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your Supabase credentials
```

Your `.env` should look like:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Add Your Room Model

Place your GLB file in the `public` folder:

```
public/My Room.glb
```

The app looks for furniture objects by common naming conventions (chair, table, sofa, etc.). For best results, name your furniture objects descriptively in your 3D modeling software.

### 5. Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Controls

| Action | Control |
|--------|---------|
| **Select furniture** | Click on object |
| **Deselect** | Press `Esc` or click empty space |
| **Move furniture** | Select → Use Move mode → Drag arrows |
| **Rotate furniture** | Select → Use Rotate mode → Drag rings |
| **Orbit camera** | Left-click drag on empty space |
| **Zoom** | Scroll wheel |
| **Pan camera** | Right-click drag |

### UI Panel

- **Transform Mode**: Switch between Move and Rotate
- **Snap Rotation**: Toggle 15° snapping for precise rotation
- **Lighting**: Choose preset (Warm/Cool/Natural) and adjust intensity
- **Save Layout**: Opens the survey modal

### Survey

Rate the room on 5 dimensions (1-7 scale):
- Comfort
- Calm
- Spacious
- Tidy
- Delightful

Optionally add tags and notes before submitting.

## Data Format

Saved layouts follow this structure:

```json
{
  "layoutId": "uuid-v4",
  "timestamp": 1709500000000,
  "objects": [
    {
      "name": "Chair_01",
      "position": [1.5, 0, 2.0],
      "rotation": [0, 0.785, 0],
      "scale": [1, 1, 1]
    }
  ],
  "lighting": {
    "preset": "natural",
    "intensity": 1.0
  },
  "survey": {
    "comfort": 6,
    "calm": 5,
    "spacious": 4,
    "tidy": 7,
    "delightful": 6,
    "tags": ["Cozy", "Modern"],
    "note": "Love the natural light!"
  }
}
```

## Project Structure

```
├── public/
│   └── My Room.glb          # Your 3D room model
├── src/
│   ├── components/
│   │   ├── Scene.tsx         # Main Three.js scene setup
│   │   ├── RoomModel.tsx     # GLB loader and furniture detection
│   │   ├── FurnitureControls.tsx  # TransformControls wrapper
│   │   ├── Lighting.tsx      # Dynamic lighting system
│   │   ├── ControlPanel.tsx  # UI control panel
│   │   └── SurveyModal.tsx   # Survey form modal
│   ├── store/
│   │   └── useStore.ts       # Zustand state management
│   ├── lib/
│   │   └── supabase.ts       # Supabase client and API
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── .env.example              # Environment template
├── package.json
└── README.md
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment to any static hosting service (Vercel, Netlify, etc.).

## Troubleshooting

### "No furniture detected"

The app identifies furniture by object names in the GLB file. Ensure your 3D objects are named with keywords like: chair, table, sofa, desk, bed, lamp, shelf, cabinet, etc.

### "Failed to save layout"

1. Check your Supabase credentials in `.env`
2. Verify the `layouts` table exists with the correct schema
3. Ensure RLS policies allow inserts

### Objects not selectable

Make sure furniture objects are separate meshes in your GLB file, not merged with the room geometry.

## License

MIT
