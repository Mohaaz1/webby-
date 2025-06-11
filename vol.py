# Define grid resolution
n = 100
dx = dy = 1 / (n - 1)

# Approximate the volume under z = x^2 + y^2 using a double loop
volume = 0

for i in range(n):
    x = i * dx
    for j in range(n):
        y = j * dy
        z = x**2 + y**2
        volume += z * dx * dy

print("Approximate volume under surface z = x^2 + y^2:", volume)