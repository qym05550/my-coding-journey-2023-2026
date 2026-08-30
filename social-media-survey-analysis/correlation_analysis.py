import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import pearsonr
import re
import warnings
warnings.filterwarnings('ignore')

def convert_usage_hours(text):
    """Convert usage hours text to numeric values"""
    if pd.isna(text):
        return np.nan
    
    text = str(text).strip().upper()
    
    # English patterns
    if any(x in text for x in ['1-3', '1–3', 'ONE TO THREE', 'BETWEEN 1']):
        return 2
    elif any(x in text for x in ['4-6', '4–6', 'FOUR TO SIX', 'BETWEEN 4']):
        return 5
    elif any(x in text for x in ['MORE THAN 6', '>6', 'ABOVE 6', 'OVER 6', '7+']):
        return 7
    elif any(x in text for x in ['LESS THAN 1', '<1', 'UNDER 1']):
        return 0.5
    
    # Arabic patterns
    elif any(x in text for x in ['أكثر من 6', 'أكثر من ٦', 'فوق 6', 'فوق ٦']):
        return 7
    elif any(x in text for x in ['1-3', '١-٣', 'واحد', 'ثلاث']):
        return 2
    elif any(x in text for x in ['4-6', '٤-٦', 'أربع', 'ست']):
        return 5
    elif any(x in text for x in ['أقل من 1', 'أقل من ١']):
        return 0.5
    
    # Try to extract numbers
    numbers = re.findall(r'\d+', text)
    if numbers:
        num = int(numbers[0])
        if num <= 1:
            return 0.5
        elif num <= 3:
            return 2
        elif num <= 6:
            return 5
        else:
            return 7
    
    return 0  # Default

def convert_psychological_impact(text):
    """Convert psychological impact text to binary values (1=affected, 0=not affected)"""
    if pd.isna(text):
        return np.nan
    
    text = str(text).strip().upper()
    
    # Positive indicators (affected = 1)
    positive_indicators = [
        'YES', 'نعم', 'STRESS', 'قلق', 'ANXIETY', 'توتر', 'SLEEP', 'نوم',
        'BOREDOM', 'ملل', 'INSOMNIA', 'أرق', 'TIRED', 'FATIGUE', 'DEPRESSION',
        'اكتئاب', 'DISTRACTION', 'تشتت', 'ADDICTION', 'إدمان', 'AFFECTED'
    ]
    
    # Negative indicators (not affected = 0)
    negative_indicators = ['NO', 'لا', 'NOT AFFECTED', 'غير متأثر', 'NONE', 'لا شيء']
    
    # Check for positive indicators first
    if any(indicator in text for indicator in positive_indicators):
        return 1
    elif any(indicator in text for indicator in negative_indicators):
        return 0
    
    return 0  # Default to not affected if unclear

def main():
    # File path
    # NOTE: original path was a personal local folder (removed before publishing this archive).
    # Point this at your own copy of the survey Excel file.
    file_path = r"./data/social_media_survey_masarek.xlsx"
    
    try:
        # Read Excel file
        print("Reading Excel file...")
        df = pd.read_excel(file_path)
        
        print(f"Data loaded successfully! Shape: {df.shape}")
        print(f"Columns: {list(df.columns)}")
        
        # Display first few rows to understand structure
        print("\nFirst 5 rows:")
        print(df.head())
        
        # Check if columns G and I exist (assuming 0-indexed: G=6, I=8)
        if len(df.columns) >= 9:
            usage_col = df.iloc[:, 6]  # Column G (index 6)
            impact_col = df.iloc[:, 8]  # Column I (index 8)
            
            print(f"\nColumn G (Usage Hours) sample values:")
            print(usage_col.dropna().head(10).tolist())
            
            print(f"\nColumn I (Psychological Impact) sample values:")
            print(impact_col.dropna().head(10).tolist())
            
            # Convert to numeric values
            print("\nConverting to numeric values...")
            df['Usage_Hours_Numeric'] = usage_col.apply(convert_usage_hours)
            df['Psychological_Impact_Numeric'] = impact_col.apply(convert_psychological_impact)
            
            # Remove rows with NaN values
            analysis_df = df[['Usage_Hours_Numeric', 'Psychological_Impact_Numeric']].dropna()
            
            print(f"\nData after cleaning: {len(analysis_df)} valid rows")
            print("\nNumeric conversion results:")
            print(f"Usage hours - Mean: {analysis_df['Usage_Hours_Numeric'].mean():.2f}, Range: {analysis_df['Usage_Hours_Numeric'].min()}-{analysis_df['Usage_Hours_Numeric'].max()}")
            print(f"Psychological impact - Mean: {analysis_df['Psychological_Impact_Numeric'].mean():.2f}, Range: {analysis_df['Psychological_Impact_Numeric'].min()}-{analysis_df['Psychological_Impact_Numeric'].max()}")
            
            if len(analysis_df) > 1:
                # Calculate correlation
                correlation, p_value = pearsonr(analysis_df['Usage_Hours_Numeric'], 
                                              analysis_df['Psychological_Impact_Numeric'])
                
                print(f"\n🔍 CORRELATION ANALYSIS RESULTS:")
                print(f"Correlation coefficient: {correlation:.4f}")
                print(f"P-value: {p_value:.4f}")
                print(f"Statistical significance: {'Yes' if p_value < 0.05 else 'No'} (p < 0.05)")
                
                # Interpret correlation strength
                if abs(correlation) < 0.1:
                    strength = "Very weak"
                elif abs(correlation) < 0.3:
                    strength = "Weak"
                elif abs(correlation) < 0.5:
                    strength = "Moderate"
                elif abs(correlation) < 0.7:
                    strength = "Strong"
                else:
                    strength = "Very strong"
                
                direction = "positive" if correlation > 0 else "negative"
                print(f"Correlation strength: {strength} {direction} correlation")
                
                # Create visualization
                plt.figure(figsize=(12, 8))
                
                # Create scatter plot
                plt.subplot(2, 2, 1)
                plt.scatter(analysis_df['Usage_Hours_Numeric'], 
                           analysis_df['Psychological_Impact_Numeric'], 
                           alpha=0.6, color='steelblue', s=50)
                
                # Add trend line
                z = np.polyfit(analysis_df['Usage_Hours_Numeric'], 
                              analysis_df['Psychological_Impact_Numeric'], 1)
                p = np.poly1d(z)
                plt.plot(analysis_df['Usage_Hours_Numeric'], 
                        p(analysis_df['Usage_Hours_Numeric']), 
                        "r--", alpha=0.8, linewidth=2)
                
                plt.xlabel('Daily Social Media Usage (Hours)')
                plt.ylabel('Psychological Impact (0=No, 1=Yes)')
                plt.title(f'Social Media Usage vs Psychological Impact\nCorrelation: {correlation:.4f}')
                plt.grid(True, alpha=0.3)
                
                # Distribution of usage hours
                plt.subplot(2, 2, 2)
                usage_counts = analysis_df['Usage_Hours_Numeric'].value_counts().sort_index()
                plt.bar(usage_counts.index, usage_counts.values, color='lightcoral', alpha=0.7)
                plt.xlabel('Usage Hours (Numeric)')
                plt.ylabel('Count')
                plt.title('Distribution of Usage Hours')
                plt.grid(True, alpha=0.3)
                
                # Distribution of psychological impact
                plt.subplot(2, 2, 3)
                impact_counts = analysis_df['Psychological_Impact_Numeric'].value_counts()
                plt.bar(['No Impact (0)', 'Has Impact (1)'], impact_counts.values, 
                       color=['lightgreen', 'salmon'], alpha=0.7)
                plt.ylabel('Count')
                plt.title('Distribution of Psychological Impact')
                plt.grid(True, alpha=0.3)
                
                # Correlation heatmap
                plt.subplot(2, 2, 4)
                corr_matrix = analysis_df[['Usage_Hours_Numeric', 'Psychological_Impact_Numeric']].corr()
                sns.heatmap(corr_matrix, annot=True, cmap='RdBu_r', center=0,
                           square=True, fmt='.4f', cbar_kws={'shrink': 0.8})
                plt.title('Correlation Matrix')
                
                plt.tight_layout()
                plt.savefig(r'./output/correlation_analysis_plot.png',
                           dpi=300, bbox_inches='tight')
                plt.show()
                
                # Save results to new Excel file
                results_df = df.copy()
                results_df['Usage_Hours_Numeric'] = df['Usage_Hours_Numeric']
                results_df['Psychological_Impact_Numeric'] = df['Psychological_Impact_Numeric']
                
                # Add summary sheet
                summary_data = {
                    'Metric': ['Correlation Coefficient', 'P-value', 'Sample Size', 
                              'Avg Usage Hours', 'Affected Percentage'],
                    'Value': [correlation, p_value, len(analysis_df),
                             analysis_df['Usage_Hours_Numeric'].mean(),
                             analysis_df['Psychological_Impact_Numeric'].mean() * 100]
                }
                summary_df = pd.DataFrame(summary_data)
                
                output_file = r'./output/correlation_analysis_results.xlsx'
                with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
                    results_df.to_excel(writer, sheet_name='Data_with_Analysis', index=False)
                    summary_df.to_excel(writer, sheet_name='Summary_Results', index=False)
                
                print(f"\n✅ Analysis completed successfully!")
                print(f"📊 Visualization saved: correlation_analysis_plot.png")
                print(f"📁 Results saved: correlation_analysis_results.xlsx")
                
            else:
                print("❌ Not enough valid data for correlation analysis")
        
        else:
            print("❌ Excel file doesn't have enough columns (need at least 9 columns)")
            print("Available columns:", len(df.columns))
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("Please check if the file exists and is accessible")

if __name__ == "__main__":
    main()
