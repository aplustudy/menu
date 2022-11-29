from flask import Flask, render_template
app = Flask(__name__) 		

@app.route("/") 		
def main():			
    return render_template("index.html")

@app.route("/roulette") 		
def roulette():			
    return render_template("roulette.html")

if __name__ == "__main__": 	
    app.run(debug=True)