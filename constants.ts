import { Step } from './types';

export const EXAMPLE_IMAGES = [
  {
    id: '1',
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBVMSkEjjq5Pble0mLQW61o28i4_MShXgtu0RteGTgFbuEtZNlohJM2xGTkNlQmqFFO1cM4WW10JF7BzB_HPgEHQJWqqLcuJM4BV5PTxcVBpNHFjlTPd9In4czAyb2wQBXsOR1n3rhJ9RN8NcCQEt32pPai-jH5PE1AS1ylwAYGof0xo1YvRHI3BjMwDorE7eIr5aGLj5rdmMv_qULI1RL-DTNNPMBPzcUHBkVPI5lmPkYIowi9VkbClFEPT_8IO1R6uRRXhM0zS0",
    alt: "Still life composition of fruits on a table"
  },
  {
    id: '2',
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOsJ0D7DZIHeyAp09xhW7kRHeAXXTFmJyyRHU5soRuP3HasNHiiqhhCXFyFPm0m_JMz7hsULn2kwyl-l5uKuG0TDr1MGm78frqIawukqDJlfuVlj1Eu1ZybPG7ZX8f7l3P6QMncMBMiCZWthpLcpJzhISaBvjg9zX6o7gxWX8fZZzQ52ieDohcddRLPpsqzPwr69Iav8_i8KbGKeh8JBaL5ERffHB8MZoSin26buKP4IN9lSLLa9G5tqsNJxkiy-yJHLQ73uNsMDA",
    alt: "Close up portrait of a cat looking at camera"
  },
  {
    id: '3',
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCy-caTZ-1W2ZMq0IFcYm2PsVPoTa5BO_b3MvAY96eO-eDoMSo-Y9DnUzW8JsL5mvZjvxdK_5kWBW3HFy3sIH5LNpvOW2s9XqcB35plxAwmm9z1MD-MV9YkAENBSznl-lT02Ic3j_cnlXn7K3Z6rlLhrbccU0LoDIL38iRqRM08JMisxZq4Ixcoa7lbOsRSMvGB84Z17cLm57xHATJq_ahK9pkEqt7UiV-Qszc2pFed3oNcOjDPtrhS3ytmNK2QWD0QktizQt4ew6k",
    alt: "Modern architectural building with geometric shapes"
  },
  {
    id: '4',
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxXQj6EyO3_64sl8Se_nQmfBXRL8ElFGHt6Dt8_CpZIoZhy3qvxRuhVL6BLAM9yjnkDUBXrTJbVXWaTMCVX2-_d23eg8p1DtWiPYnG0sfwjOONZrqdbg7pzp9ocgP9fwHnJWtAzGnzVveoWtgVnrLpypw5yvJ7rJ7Zw4a_innW46wdrf4fvMNrOhFY0H7t3qMkVyu9DqSYHF8upZ1mcUK3AwzZu2T7UYVXP6VkcaUVbbmh9kH7Smu_3uNFupbsnUg2vtIwYb3ddHI",
    alt: "Landscape view of mountains and a lake"
  }
];

export const PROFILE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuDab6TLrVTalMLU78rDHTOXXeFmi2Ab4vopC0rQ6tSLhBTJp_Pd9yHBiZVjmoJa_r3gs4_DquAMD2T0Xo5vPnUhXpCGg5U8kDFdl4zJergehRqtpsFQG_yIHJqOzhBv_2wkb6Kejkk-72fmMLdrgTuZy07QxyUBfGD3mZq-tyNgfZYUgnJ4Wo1htkcRWU_xyixAklvs6D94V7vjsBmGj37UVotgYkYpFxJSTeo1Tr2zVLtqpagXw2v6ODhQi8iRRHq0JKX2lUhLqnI";

export const APPLES_REFERENCE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCRZORhy-DFESwVKITdAgCCqiNzeIQOB8mdIVTpjf4MKAXYn7MNyYYSMMstMePkOCXHmcnDAbPC-UACjpkZJMsirG3YF--qCgjFOUHs9PRy7u7hOUow6AOTdcWwj-t9Tad7anZd86VQuDDNr5-gSEPAuijR14sZzpU1wCNVzjYe0hf-XORt0I9Fqv06D0OYk4xT9GlSQXlFQQB2zEAyMeNAIxjhR-dPXyNUXoR7yr52ra67gPdqp-5-wiN20ZCrlBmWqFe0bLC1O_8";
export const APPLES_SKETCH = "https://lh3.googleusercontent.com/aida-public/AB6AXuAPG8X_Peqf2C0pNaNM1phciWHxIDS6FOMrBKa_QT0i9GvSz4KGwhz72JhURECN7fh0Epe2eH191ikk7kdfK-ifXJCOJ9WFxz4a7W5_bzWADgPvYGfiBCLd-q_iPjDOWVMgUKkELJpDk1A8AUHWi7-l960hM_zKfNiPecLcsIhCDZCUae0JykcmshpfldJX6NyjirUmhK1YgteRuqN_LNylKO3_f5lNGYKyREmlXjsY5O1iZDDnqhqdfZ8dgeGTbfkZh1fOgnjvONQ";

export const PORTRAIT_REFERENCE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCECtrF_RUrYwSNeNUEcHtLrr6hlWd5hYBmahZzo7By_9xp3hgs5jeEVDJH_W4U29pPm8K2wZh-DALpjPnRF7JZEsvHTuEuuqACEXhB_dYHlZfrilz1PNF9KrhnIgyxC1vA09yJI84deMk25j7KThwaDOejyGQILWZZGl9OL_vnN3VH0l1HD11Om8wDm26cEDVl0kyjvI7mzqk34M6_gKk7JNPn_knXi5KVmBrGWGJLVjtPUc5ssogMdH4_9Idx1Fox-jrTUcQWL9k";

// Learning steps for the guided drawing experience
export const LEARNING_STEPS: Step[] = [
  {
    id: '1',
    title: 'Basic Outline',
    description: 'Start by tracing the main contours and shapes of your subject.',
    detailedInstructions: `Begin with light, loose strokes to establish the overall composition. Focus on the largest shapes first - these will serve as your foundation.

1. Identify the main subject and its bounding shape
2. Lightly sketch the outermost contours
3. Break complex forms into simple geometric shapes
4. Don't worry about details yet - focus on placement

Take your time with this step - a solid outline makes everything else easier!`,
    tips: [
      'Use light pressure - you can always darken lines later',
      'Step back frequently to check proportions',
      'Turn your reference upside down to see shapes more objectively',
      'Use your pencil as a measuring tool'
    ],
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'Proportions & Structure',
    description: 'Measure and mark key proportions to ensure accuracy.',
    detailedInstructions: `Now that you have a basic outline, refine the proportions. This step is crucial for achieving a likeness to your reference.

1. Use the "sight-size" method to compare measurements
2. Mark horizontal and vertical alignment points
3. Check negative spaces (the spaces around objects)
4. Adjust your outline based on these measurements

Remember: It's easier to fix proportions now than after you've added details!`,
    tips: [
      'Compare widths to heights of different elements',
      'Look for alignment between distant points',
      'Squint your eyes to simplify what you see',
      'Use a grid overlay if needed for complex subjects'
    ],
    difficulty: 'medium'
  },
  {
    id: '3',
    title: 'Details & Textures',
    description: 'Add fine details, textures, and secondary elements.',
    detailedInstructions: `With accurate proportions in place, start adding the details that bring your drawing to life.

1. Work from large details to small
2. Add secondary shapes and features
3. Begin indicating textures with appropriate marks
4. Maintain consistent detail level across the drawing

Avoid the temptation to over-detail one area while neglecting others!`,
    tips: [
      'Vary your line weight for visual interest',
      'Don\'t draw every detail - suggest textures instead',
      'Keep checking your reference frequently',
      'Take breaks to rest your eyes'
    ],
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Light & Shadow',
    description: 'Add shading to create depth and three-dimensionality.',
    detailedInstructions: `Shading transforms a flat drawing into a three-dimensional representation. Observe your reference carefully for light and shadow patterns.

1. Identify the light source direction
2. Map out the darkest shadow areas first
3. Build up mid-tones gradually
4. Preserve the lightest areas (highlights)

Work slowly and build up values in layers rather than pressing too hard!`,
    tips: [
      'Squint to see value patterns more clearly',
      'Use a value scale to match tones',
      'Blend carefully to avoid smudging',
      'Cast shadows anchor objects to their surface'
    ],
    difficulty: 'hard'
  },
  {
    id: '5',
    title: 'Final Touches',
    description: 'Refine, clean up, and add finishing details.',
    detailedInstructions: `The final step is about refinement and polish. Step back and evaluate your work as a whole.

1. Strengthen key contours and focal points
2. Clean up any stray marks or smudges
3. Adjust values for better contrast
4. Add any final details or accents

Congratulations! Take a photo of your work and compare it to your reference!`,
    tips: [
      'Use a kneaded eraser to lift highlights',
      'Darken your darkest darks for more punch',
      'Sign your work when you\'re satisfied',
      'Compare side-by-side with your reference'
    ],
    difficulty: 'easy'
  }
];

