import matplotlib.pyplot as plt
import matplotlib.animation as animation
import random

N = 30
vitesse_animation = 50

donnees = list(range(1, N + 1))
random.shuffle(donnees)

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            yield arr, j, j + 1
            
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                yield arr, j, j + 1

fig, ax = plt.subplots()
ax.set_title("Visualisation du Tri à Bulles (Python)")

barres = ax.bar(range(len(donnees)), donnees, align="edge", color="#00ff88")

ax.set_xlim(0, N)
ax.set_ylim(0, int(N * 1.1))
ax.axis('off')

text = ax.text(0.02, 0.95, "", transform=ax.transAxes, color="white")
fig.patch.set_facecolor('#0a0a0a')
ax.set_facecolor('#0a0a0a')

iteration = [0]

def update(data_tuple):
    arr, idx1, idx2 = data_tuple
    iteration[0] += 1
    
    for rect, val in zip(barres, arr):
        rect.set_height(val)
        rect.set_color("#00ff88")

    barres[idx1].set_color("red")
    barres[idx2].set_color("red")

    text.set_text(f"Opérations: {iteration[0]}")
    return barres

anim = animation.FuncAnimation(
    fig, 
    update, 
    frames=bubble_sort(donnees),
    interval=vitesse_animation,
    repeat=False,
    save_count=2000
)

plt.show()