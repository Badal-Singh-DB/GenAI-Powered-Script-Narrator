"""
GenAI-Powered Script Narrator Backend
Handles script processing and voice generation using AI models
"""

import json
import time
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

class VoiceType(Enum):
    PROFESSIONAL = "professional"
    CASUAL = "casual"
    DRAMATIC = "dramatic"
    FRIENDLY = "friendly"

class EmotionType(Enum):
    NEUTRAL = "neutral"
    HAPPY = "happy"
    SAD = "sad"
    EXCITED = "excited"
    CALM = "calm"
    CONFIDENT = "confident"

@dataclass
class ScriptAnalysis:
    sentiment: str
    complexity: str
    estimated_duration: str
    word_count: int
    suggested_voice: str
    emotion_score: float

@dataclass
class VoiceSettings:
    voice_type: VoiceType
    emotion: EmotionType
    speed: float = 1.0
    pitch: float = 0.0
    volume: float = 0.8

class ScriptNarrator:
    def __init__(self):
        self.supported_voices = {
            VoiceType.PROFESSIONAL: ["Alex", "Sarah", "Michael"],
            VoiceType.CASUAL: ["Jamie", "Chris", "Taylor"],
            VoiceType.DRAMATIC: ["Morgan", "Blake", "Jordan"],
            VoiceType.FRIENDLY: ["Sam", "Riley", "Casey"]
        }
    
    def analyze_script(self, script: str) -> ScriptAnalysis:
        """
        Analyze script content using AI to determine optimal voice settings
        """
        word_count = len(script.split())
        
        # Simulate AI analysis
        time.sleep(0.5)  # Simulate processing time
        
        # Basic sentiment analysis simulation
        positive_words = ["great", "amazing", "wonderful", "excellent", "fantastic"]
        negative_words = ["bad", "terrible", "awful", "horrible", "disappointing"]
        
        positive_count = sum(1 for word in positive_words if word in script.lower())
        negative_count = sum(1 for word in negative_words if word in script.lower())
        
        if positive_count > negative_count:
            sentiment = "Positive"
            suggested_voice = "Friendly"
            emotion_score = 0.7
        elif negative_count > positive_count:
            sentiment = "Negative"
            suggested_voice = "Dramatic"
            emotion_score = 0.3
        else:
            sentiment = "Neutral"
            suggested_voice = "Professional"
            emotion_score = 0.5
        
        # Determine complexity
        avg_word_length = sum(len(word) for word in script.split()) / word_count if word_count > 0 else 0
        complexity = "High" if avg_word_length > 6 else "Medium" if avg_word_length > 4 else "Low"
        
        # Estimate duration (average 150 words per minute)
        duration_minutes = word_count / 150
        duration_seconds = int((duration_minutes % 1) * 60)
        estimated_duration = f"{int(duration_minutes)}:{duration_seconds:02d}"
        
        return ScriptAnalysis(
            sentiment=sentiment,
            complexity=complexity,
            estimated_duration=estimated_duration,
            word_count=word_count,
            suggested_voice=suggested_voice,
            emotion_score=emotion_score
        )
    
    def generate_voice(self, script: str, settings: VoiceSettings) -> Dict:
        """
        Generate voice audio from script with specified settings
        """
        # Simulate voice generation process
        analysis = self.analyze_script(script)
        
        # Simulate processing time based on script length
        processing_time = min(len(script) / 100, 5)  # Max 5 seconds
        time.sleep(processing_time)
        
        return {
            "status": "success",
            "audio_url": f"/audio/generated_{int(time.time())}.mp3",
            "duration": analysis.estimated_duration,
            "settings_used": {
                "voice_type": settings.voice_type.value,
                "emotion": settings.emotion.value,
                "speed": settings.speed,
                "pitch": settings.pitch,
                "volume": settings.volume
            },
            "analysis": analysis.__dict__
        }
    
    def get_available_voices(self, voice_type: VoiceType) -> List[str]:
        """
        Get list of available voices for a specific type
        """
        return self.supported_voices.get(voice_type, [])
    
    def optimize_settings(self, script: str) -> VoiceSettings:
        """
        AI-powered optimization of voice settings based on script content
        """
        analysis = self.analyze_script(script)
        
        # Determine optimal voice type based on analysis
        if "business" in script.lower() or "corporate" in script.lower():
            voice_type = VoiceType.PROFESSIONAL
        elif "story" in script.lower() or "once upon" in script.lower():
            voice_type = VoiceType.DRAMATIC
        elif "hello" in script.lower() or "welcome" in script.lower():
            voice_type = VoiceType.FRIENDLY
        else:
            voice_type = VoiceType.CASUAL
        
        # Determine emotion based on sentiment
        if analysis.sentiment == "Positive":
            emotion = EmotionType.HAPPY
        elif analysis.sentiment == "Negative":
            emotion = EmotionType.SAD
        else:
            emotion = EmotionType.NEUTRAL
        
        # Adjust speed based on complexity
        speed = 0.9 if analysis.complexity == "High" else 1.1 if analysis.complexity == "Low" else 1.0
        
        return VoiceSettings(
            voice_type=voice_type,
            emotion=emotion,
            speed=speed,
            pitch=0.0,
            volume=0.8
        )

# Example usage
if __name__ == "__main__":
    narrator = ScriptNarrator()
    
    sample_script = """
    Welcome to our innovative platform that transforms the way you work. 
    Our cutting-edge technology delivers exceptional results that will 
    revolutionize your business processes and drive unprecedented growth.
    """
    
    # Analyze script
    analysis = narrator.analyze_script(sample_script)
    print(f"Analysis: {analysis}")
    
    # Optimize settings
    optimal_settings = narrator.optimize_settings(sample_script)
    print(f"Optimal Settings: {optimal_settings}")
    
    # Generate voice
    result = narrator.generate_voice(sample_script, optimal_settings)
    print(f"Generation Result: {result}")