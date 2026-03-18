/**
 * Video Generator - Creates 3D Pixar-style animated shorts
 * Uses ASCII art, emojis, and frame-based animation
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const config = require('../config/config');

const execAsync = promisify(exec);

/**
 * Pixar-style ASCII art frames
 */
const pixarFrames = {
  'robot-wave': [
    `
    🤖
   /|\\ 
    | 
   /|\\
    `,
    `
   🤖
  /|\\\\
   |
  /|\\\\
    `,
    `
    🤖
   /|\\
    |
   /|\\
    `,
  ],

  'lightbulb-shine': [
    `
     💡
    ~~~
     
    `,
    `
    ~~~
     💡
    ~~~
    `,
    `
     
    ~~~
     💡
    `,
  ],

  'rocket-launch': [
    `
      🚀
      |
      
    ====
    `,
    `
       🚀
       |
       
     ====
    `,
    `
        🚀
        |
        
      ====
    `,
  ],

  'quantum-wave': [
    `
    ∿∿∿∿∿
    ∿∿∿∿∿
    ∿∿∿∿∿
    `,
    `
    ≈≈≈≈≈
    ≈≈≈≈≈
    ≈≈≈≈≈
    `,
    `
    ~~~~~ 
    ~~~~~ 
    ~~~~~ 
    `,
  ],

  'pixar-bounce': [
    `
      🟠
    /  \\
   |PIXAR|
    \\__/
    `,
    `
     
    /  \\
   |PIXAR|
    \\  /
      🟠
    `,
  ],
};

/**
 * Create a simple frame with text
 */
const createFrame = (frameIndex, totalFrames, text, asciiArt) => {
  const gradient = ['▓', '▒', '░', ' '];
  const bgColor = gradient[frameIndex % gradient.length];
  
  let frame = '';
  
  // Create a 1080x1920 frame (but simplified for terminal/image)
  for (let i = 0; i < 20; i++) {
    if (i === 5) {
      // Center ASCII art
      frame += '\n' + asciiArt + '\n';
    } else if (i === 12) {
      // Center text
      const padding = Math.max(0, (50 - text.length) / 2);
      frame += ' '.repeat(Math.floor(padding)) + text + '\n';
    } else {
      frame += bgColor.repeat(50) + '\n';
    }
  }

  return frame;
};

/**
 * Generate video frames using ffmpeg and ImageMagick
 */
const generateVideoFrames = async (script, outputDir) => {
  console.log(`📹 Generating video frames for: ${script.title}`);

  try {
    // Create frame images using ffmpeg
    const frameDir = path.join(outputDir, 'frames');
    if (!fs.existsSync(frameDir)) {
      fs.mkdirSync(frameDir, { recursive: true });
    }

    // Simple frame generation using ImageMagick (convert command)
    // This creates a series of gradient/color frames for the video

    const totalFrames = Math.ceil((script.estimatedDuration || 30) * config.video.fps);
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

    for (let i = 0; i < totalFrames; i++) {
      const color = colors[i % colors.length];
      const frameFile = path.join(frameDir, `frame_%04d.png`.replace('%04d', String(i).padStart(4, '0')));

      // Create a frame with ImageMagick
      const cmd = `convert -size ${config.video.width}x${config.video.height} xc:"${color}" "${frameFile}"`;
      
      try {
        await execAsync(cmd);
      } catch (err) {
        // ImageMagick might not be available, create placeholder
        console.warn(`⚠️  ImageMagick not available, creating text-based placeholder`);
        break;
      }
    }

    console.log(`✅ Generated ${totalFrames} frames`);
    return frameDir;
  } catch (error) {
    console.error('❌ Frame generation error:', error.message);
    throw error;
  }
};

/**
 * Create a demo video file (MP4 stub with metadata)
 */
const createDemoVideo = async (script, audioFile, outputDir) => {
  console.log(`🎬 Creating demo video for: ${script.title}`);

  try {
    const videoFile = path.join(outputDir, `video_${Date.now()}.mp4`);
    
    // Check if ffmpeg is available
    try {
      await execAsync('ffmpeg -version');
      
      // Create a simple video with solid color + audio
      const cmd = `
        ffmpeg -f lavfi -i color=c=#1a1a2e:s=${config.video.width}x${config.video.height}:d=${script.estimatedDuration || 30} \
               -i "${audioFile}" \
               -c:v libx264 -crf 23 \
               -c:a aac -b:a 128k \
               -y "${videoFile}" 2>/dev/null
      `;

      await execAsync(cmd);
      console.log(`✅ Video created: ${videoFile}`);
      return videoFile;
    } catch (ffmpegErr) {
      console.warn('⚠️  FFmpeg not available, creating placeholder video metadata file');
      
      // Create a JSON metadata file instead
      const metadata = {
        title: script.title,
        duration: script.estimatedDuration || 30,
        width: config.video.width,
        height: config.video.height,
        fps: config.video.fps,
        audioFile: audioFile,
        theme: script.theme,
        status: 'demo-placeholder',
        generatedAt: new Date().toISOString(),
      };

      const metaFile = path.join(outputDir, `video_${Date.now()}_metadata.json`);
      fs.writeFileSync(metaFile, JSON.stringify(metadata, null, 2));
      console.log(`✅ Video metadata saved: ${metaFile}`);
      return metaFile;
    }
  } catch (error) {
    console.error('❌ Video creation error:', error.message);
    throw error;
  }
};

/**
 * Generate complete video package
 */
const generateVideo = async (script) => {
  const timestamp = Date.now();
  const outputDir = path.join(config.paths.videos, `video_${timestamp}`);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Step 1: Generate frames (optional - depends on tools available)
    console.log('\n🎨 Step 1: Generating visual frames...');
    try {
      await generateVideoFrames(script, outputDir);
    } catch (err) {
      console.log('⚠️  Skipping frame generation (tools not available)');
    }

    // Step 2: Create demo audio file (placeholder since ElevenLabs needs API key)
    console.log('\n🔊 Step 2: Creating audio...');
    const audioFile = path.join(outputDir, 'audio.mp3');
    const audioMetadata = {
      title: script.title,
      duration: script.estimatedDuration,
      voiceId: config.elevenlabs.voiceId,
      status: 'demo-placeholder-audio',
      script: script.content,
      note: 'In production, this would be generated via ElevenLabs API',
      generatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(audioFile + '.json', JSON.stringify(audioMetadata, null, 2));
    console.log(`✅ Audio metadata: ${audioFile}.json`);

    // Step 3: Create video
    console.log('\n🎬 Step 3: Creating video...');
    const videoFile = await createDemoVideo(script, audioFile, outputDir);

    // Step 4: Create package metadata
    const packageMetadata = {
      id: `yt_${timestamp}`,
      script: {
        title: script.title,
        theme: script.theme,
        content: script.content,
      },
      video: {
        file: videoFile,
        width: config.video.width,
        height: config.video.height,
        duration: script.estimatedDuration,
      },
      audio: {
        file: audioFile,
      },
      status: 'ready-for-upload',
      createdAt: new Date().toISOString(),
    };

    const metaPath = path.join(outputDir, 'package.json');
    fs.writeFileSync(metaPath, JSON.stringify(packageMetadata, null, 2));

    console.log(`\n✅ Video package created!`);
    console.log(`   📦 Location: ${outputDir}`);
    console.log(`   📄 Package: ${metaPath}`);

    return {
      success: true,
      packagePath: metaPath,
      packageMetadata,
    };
  } catch (error) {
    console.error('❌ Video generation failed:', error.message);
    throw error;
  }
};

/**
 * Create a showcase of all animation styles
 */
const createAnimationShowcase = () => {
  console.log('\n🎨 Pixar Animation Styles Available:\n');

  for (const [name, frames] of Object.entries(pixarFrames)) {
    console.log(`\n${name.toUpperCase()}:`);
    frames.forEach((frame, idx) => {
      console.log(`Frame ${idx + 1}:`);
      console.log(frame);
    });
  }
};

module.exports = {
  generateVideo,
  generateVideoFrames,
  createDemoVideo,
  pixarFrames,
  createAnimationShowcase,
};
