import os
import requests
import speech_recognition as sr
import pyttsx3
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class JarvisAssistant:
    def __init__(self):
        self.engine = pyttsx3.init()
        self.recognizer = sr.Recognizer()
        self.openai_keys = os.getenv('OPENAI_KEYS').split(',')
        self.current_key = 0
        
    def get_openai_client(self):
        client = OpenAI(api_key=self.openai_keys[self.current_key])
        self.current_key = (self.current_key + 1) % len(self.openai_keys)
        return client
    
    def speak(self, text):
        self.engine.say(text)
        self.engine.runAndWait()
    
    def listen(self):
        with sr.Microphone() as source:
            print("Listening...")
            audio = self.recognizer.listen(source)
            try:
                return self.recognizer.recognize_google(audio).lower()
            except:
                return ""

    def get_weather(self, city):
        api_key = os.getenv('OPENWEATHER_API')
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"
        response = requests.get(url)
        return response.json()

    def analyze_image(self, image_url):
        headers = {"Authorization": f"Bearer {os.getenv('SCENE_API')}"}
        response = requests.post(
            "https://api.scenex.com/v1/analyze",
            json={"image": image_url},
            headers=headers
        )
        return response.json()

    def handle_ai_query(self, prompt):
        try:
            client = self.get_openai_client()
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error: {str(e)}"

if __name__ == "__main__":
    jarvis = JarvisAssistant()
    
    while True:
        command = jarvis.listen()
        
        if "jarvis" in command:
            if "weather" in command:
                city = command.split("in ")[-1]
                weather = jarvis.get_weather(city)
                jarvis.speak(f"Weather in {city}: {weather['weather'][0]['description']}")
            
            elif "analyze" in command:
                jarvis.speak("Please provide image URL")
                image_url = jarvis.listen()
                analysis = jarvis.analyze_image(image_url)
                jarvis.speak(analysis['result']['description'])
            
            elif "stop" in command:
                jarvis.speak("Goodbye!")
                break
            
            else:
                response = jarvis.handle_ai_query(command)
                jarvis.speak(response)
