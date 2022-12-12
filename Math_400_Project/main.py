import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import norm
import datetime

#Import and read the CSV file
csv = pd.read_csv("Math_400_Project\ETH-USD.csv", parse_dates=True)
date = pd.to_datetime(csv.Date)
closingValue = csv.Close

#Plotting to show the history of ETH-USD valuation
plt.title("ETH-USD Historical Data")
plt.plot(date, closingValue)
plt.xlabel("Date")
plt.ylabel("USD Value/ETH")
plt.show()

#Calculating the Monte Carlo Simulations
#Log Returns = (1 + log(closingValue(%)))
logReturns = np.log(1 + closingValue.pct_change()) #Percentage Return Value
u = logReturns.mean() #Mean Value
variance = logReturns.var() #Variance Value
stdev = logReturns.std() #Calculate the standard deviation
D = u - (0.5*variance) #Drift = mean - 1/2(deviation^2)
print(D)

#Calculate a 1 year projection
days = 365 #1 year prediction
iterations = 100 #More iterations can provide more accurate results
Z = norm.ppf(np.random.rand(days, iterations)) #Z is a randomized variable used to help calculate volatility
dailyReturns = np.exp(D + stdev * Z)

#Calculating the individual price paths for projections
projectedValue = np.zeros_like(dailyReturns) 
projectedValue[0] = closingValue.iloc[0]
for t in range(1, days):
    projectedValue[t] = projectedValue[t-1]*dailyReturns[t]
base = date.iloc[0]
futureDates = [base + datetime.timedelta(days=x) for x in range(days)]

#Plotting the line graph with potential projected values
plt.plot(date, closingValue, linestyle='dashed')
plt.plot(futureDates, projectedValue)
plt.ylabel("Close price (ETH/USD)")
plt.show()

#Plotting the bar graph for valuation frequency
sns.histplot(projectedValue[-1,:], bins = 20, stat = "frequency")
plt.xlabel("Close price (ETH/USD)")
plt.ylabel("Frequency")
plt.show()
