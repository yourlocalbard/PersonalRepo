import numpy as np
import pandas as pd
from pandas_datareader import data as wb
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import norm
import datetime

#Import and read the CSV file
file = pd.read_csv("Math_400_Project\ETH-USD.csv", parse_dates=True)
date = pd.to_datetime(file.Date)
data = file.Close

#Plotting to show the history of ETH-USD valuation
plt.plot(date, data)
plt.show()

log_returns = np.log(1 + data.pct_change())
u = log_returns.mean()
var = log_returns.var()
drift = u - (0.5*var)

stdev = log_returns.std()
days = 30 # 1 month prediction
iterations = 100
Z = norm.ppf(np.random.rand(days, iterations))
daily_returns = np.exp(drift + stdev * Z)

price_paths = np.zeros_like(daily_returns)
price_paths[0] = data.iloc[0]
for t in range(1, days):
    price_paths[t] = price_paths[t-1]*daily_returns[t]

base = date.iloc[0]
future_dates = [base + datetime.timedelta(days=x) for x in range(days)]

#Printing line graph with potential projected values
plt.plot(date, data, linestyle='dashed')
plt.plot(future_dates, price_paths)
plt.ylabel("Close price (ETH/USD)")
plt.show()

#Printing plot for valuation frequency
sns.histplot(price_paths[-1,:], bins = 20, stat = "frequency")
plt.xlabel("Close price (ETH/USD)")
plt.ylabel("Frequency")
plt.show()
