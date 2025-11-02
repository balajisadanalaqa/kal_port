# Assets Directory Structure

## Structure
```
src/assets/
├── sarah_johnson/
│   ├── images/
│   │   ├── initial_assessment.jpg
│   │   ├── pelvic_tilt.jpg
│   │   ├── bird_dog.jpg
│   │   └── progress.jpg
│   └── videos/
│       ├── dead_bug.mp4
│       └── bridge_progression.mp4
├── michael_chen/
│   ├── images/
│   │   ├── post_surgery_assessment.jpg
│   │   ├── quad_set.jpg
│   │   ├── straight_leg_raise.jpg
│   │   └── step_up.jpg
│   └── videos/
│       ├── mini_squat.mp4
│       └── balance_exercises.mp4
├── emily_rodriguez/
│   ├── images/
│   │   ├── shoulder_assessment.jpg
│   │   ├── wall_slide.jpg
│   │   ├── external_rotation.jpg
│   │   └── scapular_retraction.jpg
│   └── videos/
│       ├── prone_y.mp4
│       └── shoulder_blade_squeeze.mp4
├── david_thompson/
│   ├── images/
│   │   ├── ankle_assessment.jpg
│   │   ├── single_leg_balance.jpg
│   │   ├── heel_to_toe.jpg
│   │   └── calf_raise.jpg
│   └── videos/
│       ├── ankle_circles.mp4
│       └── proprioception_training.mp4
└── lisa_wang/
    ├── images/
    │   ├── thomas_test.jpg
    │   ├── hip_flexor_stretch.jpg
    │   ├── clamshell.jpg
    │   └── fire_hydrant.jpg
    └── videos/
        ├── dynamic_hip_stretch.mp4
        └── glute_bridge_variations.mp4
```

## URL Format
- **Images**: `/src/assets/patientname/images/movement.jpg`
- **Videos**: `/src/assets/patientname/videos/movement.mp4`

## How to Switch
1. Create the directory structure above
2. Add your media files
3. In `src/data/patientsData.js`, uncomment the local URLs and comment out the placeholder URLs

Example:
```javascript
// Before
url: "https://picsum.photos/seed/sarah1/800/600",
// url: "/src/assets/sarah_johnson/images/initial_assessment.jpg",

// After
// url: "https://picsum.photos/seed/sarah1/800/600",
url: "/src/assets/sarah_johnson/images/initial_assessment.jpg",
```