# Temperature readings over a week
temperatures = [20, 22, 19, 23, 21, 24, 20]
days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

# Determine min and max temperatures for scaling
min_temp = min(temperatures)
max_temp = max(temperatures)

# Draw ASCII graph
print("Weekly Temperature Readings (ASCII Graph)")
print()

for day, temp in zip(days, temperatures):
    bar = '*' * (temp - min_temp)  # Number of stars = temperature offset
    print(f"{day}: {temp}°C | {bar}")