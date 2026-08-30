# Seaborn Data Visualization Study Guide
## 1. Introduction to Seaborn

| Concept | Description |
| :--- | :--- |
| **Seaborn** | A high-level interface for drawing attractive and informative statistical graphics. |
| **Matplotlib** | The foundational plotting library in Python that Seaborn extends. |
| **Goal** | To create plots with minimal code, focusing on statistical relationships. |
| **Context** | This tutorial is part of a broader data science and machine learning series. |

## 2. Univariate and Bivariate Distribution Plots

These plots are used to visualize the distribution of data, either for a single variable (univariate) or the relationship between two variables (bivariate).

### 2.1. Distribution Plot (`sns.distplot`)
*   **Purpose:** Used to visualize the **univariate distribution** of a single variable.
*   **Key Feature:** Shows the overall shape and spread of the data.
*   **Customization:** Can be customized by adding or removing elements, such as the **Kernel Density Estimation (KDE)** curve.

### 2.2. Joint Plot (`sns.jointplot`)
*   **Purpose:** Used to compare **two distributions** simultaneously (bivariate analysis). It combines a scatter plot for the two variables with histograms or KDE plots on the margins.
*   **Key Feature:** Displays the relationship between two variables and their individual distributions.
*   **Customization:**
    *   Add a **regression line** to visualize linear relationships.
    *   Change the **type of plot** (e.g., scatter, hex, kde, reg).

### 2.3. KDE Plot (`sns.kdeplot`)
*   **Concept:** **Kernel Density Estimation (KDE)** is a non-parametric way to estimate the probability density function of a random variable.
*   **Purpose:** Used to estimate and visualize the distribution of data, often providing a smoother representation than a histogram.
*   **Use Case:** Often used in conjunction with other plots (like `jointplot`) to show density contours.

### 2.4. Rug Plot (`sns.rugplot`)
*   **Purpose:** Plots a single column of data points as small vertical lines (sticks) along an axis.
*   **Key Feature:** Shows the **density of the data** directly, with denser areas having more sticks.
*   **Use Case:** While not commonly used alone, it is useful for visualizing the raw data points that underlie a KDE plot.

---

## 3. Multi-Variable and Matrix Plots

These plots are designed to visualize relationships across multiple variables or an entire dataset.

### 3.1. Pair Plot (`sns.pairplot`)
*   **Purpose:** Plots the relationships across the **entire DataFrame's numerical values**.
*   **Structure:**
    *   **Diagonal:** Displays **histograms** (or KDE plots) for each individual variable.
    *   **Off-Diagonal:** Displays **scatter plots** showing the relationship between every pair of variables.
*   **Key Feature:** Provides a comprehensive, high-level view of all pairwise relationships in the data.
*   **Customization:**
    *   Use the **`hue`** parameter to introduce a categorical variable, coloring the points based on that category.

### 3.2. Heatmap (`sns.heatmap`)
*   **Purpose:** Visualizes data in a **matrix format**, where the intensity of color represents the magnitude of a value.
*   **Preparation:** Requires the data to be in a matrix format, such as a **correlation matrix** (using `.corr()`) or a **pivot table**.
*   **Key Feature:** Excellent for visualizing correlations or other structured matrix data.
*   **Function:** `sns.heatmap(data_matrix)`

### 3.3. Cluster Map (`sns.clustermap`)
*   **Purpose:** A **hierarchically clustered heatmap**. It goes beyond a standard heatmap by performing clustering.
*   **Mechanism:** Calculates the distance between data points and joins the closest ones, clustering similar data types or points together.
*   **Difference from Heatmap:** A standard heatmap simply visualizes the matrix as-is, while a cluster map **repositions the data** (rows and columns) to find and visually emphasize clusters and patterns.
*   **Customization:** Normalizing the data can help to focus the clustering and identify specific patterns.

---

## 4. Categorical Plots

These plots are specifically designed for visualizing data involving categorical variables.

### 4.1. Bar Plot (`sns.barplot`)
*   **Purpose:** Used for **categorical plotting**, showing the central tendency (e.g., mean) of a numerical variable for different categories.
*   **Key Feature:** Focuses on the distribution of a numerical variable in reference to a categorical variable.
*   **Customization:**
    *   The **`estimator`** parameter can change the aggregation method (e.g., `mean`, `median`, `std`).

### 4.2. Count Plot (`sns.countplot`)
*   **Purpose:** A specialized type of bar plot that simply **counts the number of occurrences** (frequency) of each category in a single categorical column.
*   **Key Feature:** Directly shows the total count for each category.
*   **Customization:** Supports `hue`, `order`, `color`, and `palette` options.

### 4.3. Box Plot (`sns.boxplot`)
*   **Purpose:** Used to compare the distribution of a numerical variable across different categories.
*   **Key Features:**
    *   **Box:** Represents the **Interquartile Range (IQR)**, with the line inside being the **median**.
    *   **Whiskers:** Extend to show the range of the data, typically 1.5 times the IQR.
    *   **Outliers:** Individual points outside the whiskers.
*   **Customization:** Use the **`hue`** parameter to add a second categorical variable for comparison.

### 4.4. Violin Plot (`sns.violinplot`)
*   **Purpose:** A combination of a **box plot** and a **KDE plot**. It provides a more detailed view of the data distribution than a box plot.
*   **Key Feature:** The width of the "violin" shape represents the estimated probability density at that value.
*   **Customization:**
    *   The **`split`** option can be used to compare two categories within a single violin shape, saving space and facilitating direct comparison.

### 4.5. Strip Plot (`sns.stripplot`)
*   **Purpose:** A type of **scatter plot** that shows all individual data points for a categorical variable.
*   **Use Case:** Often used alongside a box plot or violin plot to show the raw data points.
*   **Customization:**
    *   **`jitter`:** Spreads out the data points horizontally to prevent them from stacking on top of each other.
    *   **`hue`** and **`dodge`:** Can be used to separate the data into different categories (e.g., men and women) and prevent overlap.

### 4.6. Swarm Plot (`sns.swarmplot`)
*   **Purpose:** Similar to a strip plot, but the points are **adjusted to prevent overlap** entirely, creating a "swarm" of points.
*   **Key Feature:** Provides a detailed view of the distribution while ensuring every data point is visible.
*   **Use Case:** Excellent for visualizing the distribution of a small to medium-sized dataset, often used in conjunction with a violin plot.

---

## 5. Advanced Grid Plots

These functions provide greater control over the structure and content of multi-plot figures.

### 5.1. Pair Grid (`sns.PairGrid`)
*   **Purpose:** Provides **specific control** over what plots and data show up where in a matrix layout. It is the underlying object used by `sns.pairplot`.
*   **Mechanism:**
    1.  Create an empty grid system based on the data: `g = sns.PairGrid(data)`
    2.  Map different plot functions to the diagonal, upper, and lower triangles of the grid (e.g., `g.map_diag(plt.hist)`, `g.map_upper(sns.scatterplot)`).
*   **Key Feature:** Allows for more customization than the single-function `pairplot`.

### 5.2. Facet Grid (`sns.FacetGrid`)
*   **Purpose:** Allows printing **multiple plots in a grid** defined by columns and rows based on categorical variables.
*   **Mechanism:**
    1.  Create the grid object, defining the variables for columns (`col`) and rows (`row`): `g = sns.FacetGrid(data, col='category_1', row='category_2')`
    2.  Map a plotting function to the grid (e.g., `g.map(plt.hist, 'numerical_variable')`).
*   **Key Feature:** Ideal for creating complex plots that compare the distribution or relationship of variables across different categories.
*   **Customization:** Supports changing column/row order, palette, and marker customizations (size, line width, color, symbols).

---

## 6. Regression Plots

These plots are used to visualize the relationship between variables and fit a linear regression model.

### 6.1. Regression Plot (`sns.lmplot`)
*   **Purpose:** Used to study the **linear relationship** between two variables (e.g., total bill and tip amount).
*   **Function:** `sns.lmplot(x='var_x', y='var_y', data=df)`
*   **Key Feature:** Automatically draws a scatter plot and fits a linear regression line with a confidence interval.
*   **Customization:**
    *   **`hue`:** Separate the data into different regression lines based on a categorical variable.
    *   **`markers`:** Customize the shape of the scatter plot points.
    *   **`scatter_kws`:** A dictionary of keyword arguments passed to the underlying scatter plot function to change properties like size, line width, and edge color.
    *   **Grid Customization:** Can be customized to separate the data into separate columns or rows based on different variables (similar to `FacetGrid`).

---

## 7. Styling and Customization

Seaborn provides functions to quickly adjust the aesthetic context of the plots.

| Function | Purpose | Options (Examples) |
| :--- | :--- | :--- |
| `sns.set_style()` | Changes the styling of the axes and grids. | `white`, `dark`, `whitegrid`, `darkgrid`, `ticks` |
| `sns.set_context()` | Changes the font size and style, scaling plot elements for different presentation contexts. | `paper`, `notebook` (default), `talk`, `poster` |
| **Palettes** | Changes the color scheme used in the plots. | Can be set using the `palette` parameter in plotting functions. Different color maps are available (e.g., from Matplotlib). |
| **General Customization** | Fine-tuning plot elements. | Adjusting plot size, aspect ratio, legend location (often using Matplotlib functions). |
