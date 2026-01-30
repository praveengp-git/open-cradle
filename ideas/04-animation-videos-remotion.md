# Animation Videos with Claude Code + Remotion

**Status**: Idea
**Priority**: TBD
**Created**: 2026-01-30
**Effort**: Medium-Large

## Concept

Use Claude Code to generate animation videos programmatically using Remotion (React-based video creation). Automate the entire pipeline: script → visuals → animations → render → export.

## Why This Matters

- Video content is king but time-consuming to create
- Remotion allows programmatic video creation (code = video)
- Can automate explainer videos, tutorials, social media content
- Scale video production without hiring editors/animators

## Technical Approach

### Tech Stack
- **Remotion**: React framework for video creation
- **Claude Code**: Script generation, scene design, asset selection
- **React/TypeScript**: Component-based animations
- **FFmpeg**: Video rendering
- **Asset Libraries**: Unsplash, icons8, generated graphics

### Architecture

1. **Content Planning**
   - Input: Topic, target audience, duration, style
   - Claude generates: Script, scene breakdown, visual suggestions
   - Storyboard creation (text description of each scene)

2. **Asset Generation/Selection**
   - Generate or source visuals (images, icons, illustrations)
   - Select background music, sound effects
   - Create/find fonts, color schemes

3. **Remotion Component Generation**
   - Claude writes React components for each scene
   - Animations: fade, slide, zoom, transitions
   - Text overlays, captions, call-to-actions
   - Timing and sequencing

4. **Rendering Pipeline**
   - Remotion renders video frames
   - Combine with audio
   - Export to MP4/MOV
   - Optimize for platform (YouTube, Instagram, TikTok)

### Implementation Plan
1. Learn Remotion fundamentals
2. Build library of reusable animation components
3. Create templates for common video types (explainer, tutorial, ad)
4. Integrate Claude for script and component generation
5. Set up rendering infrastructure (local or cloud)
6. Build end-to-end automation pipeline
7. Test with sample videos

## Challenges

- **Rendering Time**: Video rendering can be slow and CPU-intensive
- **Asset Quality**: Finding/generating high-quality visuals
- **Animation Complexity**: Creating smooth, professional animations
- **Voice-Over**: TTS vs hiring voice actors
- **File Size**: Large video files, storage costs
- **Creative Quality**: Avoiding generic "AI-generated" look

## Success Criteria

- [ ] Generate a complete 60-second video from a single prompt
- [ ] Render quality matches semi-professional standards
- [ ] Automation reduces creation time by 80%+
- [ ] Create 3 different video styles/templates
- [ ] Successfully post to YouTube/social media

## Resources Needed

- Remotion Pro license (for rendering)
- Asset subscriptions (stock footage, music)
- Cloud rendering (AWS, Render.com) or powerful local machine
- Text-to-speech service (ElevenLabs, etc.) for narration

## Video Types to Automate

### High Value
1. **Explainer Videos**: Product features, how-tos
2. **Social Media Content**: Short-form, attention-grabbing
3. **Educational Content**: Tutorials, concepts, walkthroughs
4. **Marketing Ads**: Product showcases, testimonials
5. **Data Visualizations**: Animated charts, infographics

### Remotion Advantages
- Version control for videos (it's just code!)
- Reusable components and templates
- Data-driven animations (pull from APIs)
- Pixel-perfect precision
- Easy to iterate and update

---

**Notes**: This could be a game-changer for content creation. Remotion's programmatic approach fits perfectly with Claude's code generation abilities. Start simple (text + basic animations) then add complexity.
