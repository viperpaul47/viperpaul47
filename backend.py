from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # Today's "Fake" Data (We will replace this with an API tmr!)
    current_weather = "Chilly and Raining"
    my_suggestion = "A raincoat and waterproof boots"
    
    return render_template('frontend.html', weather_status=current_weather, outfit=my_suggestion)

if __name__ == '__main__':
    app.run(debug=True)