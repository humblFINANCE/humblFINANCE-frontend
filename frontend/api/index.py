from fastapi import FastAPI

# import humbldata as hd

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/healthcheck")
def healthcheck():
    return {"status": "Check, Check, 1..2...!"}

# @app.get("/api/stock_price")
# def get_stock_price(ticker: str):
#     stock = yf.Ticker(ticker)
#     hist = stock.history(period="1d")
#     latest_price = hist['Close'].iloc[-1]
#     rounded_price = round(latest_price, 2)
#     return {"ticker": ticker, "price": rounded_price}