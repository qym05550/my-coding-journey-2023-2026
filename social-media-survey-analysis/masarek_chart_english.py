import matplotlib.pyplot as plt
import numpy as np

# Data
categories = ['Before Program', 'After Program']
usage_hours = [4.5, 2.1]
colors = ['#ff6b6b', '#4ecdc4']

# Create the chart
fig, ax = plt.subplots(figsize=(12, 8))

# Create bars
bars = ax.bar(categories, usage_hours, color=colors, width=0.6, alpha=0.8)

# Add values on top of bars
for i, (bar, value) in enumerate(zip(bars, usage_hours)):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1, 
            f'{value} hours', ha='center', va='bottom', fontsize=14, fontweight='bold')

# Chart formatting
ax.set_title('"Masarek" Program Impact on Reducing Average Daily\nSocial Media Usage Among Participants (n=33)\n4-Week Trial Period', 
             fontsize=16, fontweight='bold', pad=30)
ax.set_ylabel('Average Daily Usage (Hours)', fontsize=14)
ax.set_ylim(0, 5)

# Add grid
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.set_axisbelow(True)

# Calculate improvement percentage
improvement = ((4.5 - 2.1) / 4.5) * 100

# Add improvement percentage text
ax.text(0.5, 0.85, f'Improvement: {improvement:.1f}%', 
        transform=ax.transAxes, ha='center', va='center',
        bbox=dict(boxstyle="round,pad=0.5", facecolor="lightgreen", alpha=0.7),
        fontsize=14, fontweight='bold')


# Add reduction amount
reduction = 4.5 - 2.1
ax.text(0.5, 0.75, f'Reduction: {reduction:.1f} hours/day', 
        transform=ax.transAxes, ha='center', va='center',
        bbox=dict(boxstyle="round,pad=0.3", facecolor="lightyellow", alpha=0.7),
        fontsize=12, fontweight='bold')

plt.tight_layout()
# NOTE: original path was a personal local folder (removed before publishing this archive).
plt.savefig('./output/masarek_chart_english.png', dpi=300, bbox_inches='tight')
plt.show()

print("Chart created successfully!")
print(f"Improvement: {improvement:.1f}%")
print(f"Daily reduction: {reduction:.1f} hours")
print("File saved as: masarek_chart_english.png")
