Sub CorrelationAnalysis()
    ' Macro to analyze correlation between social media usage (Column G) and psychological impact (Column I)
    
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim i As Long
    Dim usageText As String
    Dim impactText As String
    Dim usageNumeric As Double
    Dim impactNumeric As Double
    Dim correlation As Double
    
    ' Set the active worksheet
    Set ws = ActiveSheet
    
    ' Find the last row with data
    lastRow = ws.Cells(ws.Rows.Count, "G").End(xlUp).Row
    
    ' Add headers for helper columns
    ws.Cells(1, 10).Value = "Usage Hours (Numeric)"  ' Column J
    ws.Cells(1, 11).Value = "Psychological Impact (Numeric)"  ' Column K
    
    ' Process each row starting from row 2
    For i = 2 To lastRow
        ' Get the text values
        usageText = UCase(Trim(ws.Cells(i, 7).Value))  ' Column G
        impactText = UCase(Trim(ws.Cells(i, 9).Value))  ' Column I
        
        ' Convert usage hours to numeric values
        If InStr(usageText, "1-3") > 0 Or InStr(usageText, "1–3") > 0 Or InStr(usageText, "واحد") > 0 Or InStr(usageText, "ثلاث") > 0 Then
            usageNumeric = 2
        ElseIf InStr(usageText, "4-6") > 0 Or InStr(usageText, "4–6") > 0 Or InStr(usageText, "أربع") > 0 Or InStr(usageText, "ست") > 0 Then
            usageNumeric = 5
        ElseIf InStr(usageText, "MORE") > 0 Or InStr(usageText, ">6") > 0 Or InStr(usageText, "أكثر") > 0 Or InStr(usageText, "سبع") > 0 Then
            usageNumeric = 7
        ElseIf InStr(usageText, "LESS") > 0 Or InStr(usageText, "<1") > 0 Or InStr(usageText, "أقل") > 0 Then
            usageNumeric = 0.5
        Else
            usageNumeric = 0  ' Default or unknown
        End If
        
        ' Convert psychological impact to numeric values (1 = Yes/Affected, 0 = No/Not Affected)
        If InStr(impactText, "YES") > 0 Or InStr(impactText, "نعم") > 0 Or _
           InStr(impactText, "STRESS") > 0 Or InStr(impactText, "قلق") > 0 Or _
           InStr(impactText, "ANXIETY") > 0 Or InStr(impactText, "توتر") > 0 Or _
           InStr(impactText, "SLEEP") > 0 Or InStr(impactText, "نوم") > 0 Or _
           InStr(impactText, "BOREDOM") > 0 Or InStr(impactText, "ملل") > 0 Or _
           InStr(impactText, "INSOMNIA") > 0 Or InStr(impactText, "أرق") > 0 Then
            impactNumeric = 1
        ElseIf InStr(impactText, "NO") > 0 Or InStr(impactText, "لا") > 0 Then
            impactNumeric = 0
        Else
            impactNumeric = 0  ' Default to no impact if unclear
        End If
        
        ' Write the numeric values to helper columns
        ws.Cells(i, 10).Value = usageNumeric  ' Column J
        ws.Cells(i, 11).Value = impactNumeric  ' Column K
    Next i
    
    ' Calculate correlation
    correlation = Application.WorksheetFunction.Correl(ws.Range("J2:J" & lastRow), ws.Range("K2:K" & lastRow))
    
    ' Display correlation result
    ws.Cells(lastRow + 2, 10).Value = "Correlation Coefficient:"
    ws.Cells(lastRow + 2, 11).Value = correlation
    ws.Cells(lastRow + 2, 11).NumberFormat = "0.0000"
    
    ' Create scatter plot
    Dim chartObj As ChartObject
    Dim chart As Chart
    
    ' Add a new chart
    Set chartObj = ws.ChartObjects.Add(Left:=400, Top:=50, Width:=500, Height:=300)
    Set chart = chartObj.Chart
    
    ' Configure the chart
    With chart
        .ChartType = xlXYScatter
        .SetSourceData Source:=ws.Range("J2:K" & lastRow)
        .HasTitle = True
        .ChartTitle.Text = "Social Media Usage vs Psychological Impact"
        .Axes(xlCategory).HasTitle = True
        .Axes(xlCategory).AxisTitle.Text = "Daily Usage Hours"
        .Axes(xlValue).HasTitle = True
        .Axes(xlValue).AxisTitle.Text = "Psychological Impact (0=No, 1=Yes)"
        
        ' Add trendline
        .SeriesCollection(1).Trendlines.Add(Type:=xlLinear, DisplayEquation:=True, DisplayRSquared:=True)
    End With
    
    ' Format the data columns
    ws.Columns("J:K").AutoFit
    
    ' Show completion message
    MsgBox "Correlation analysis completed!" & vbCrLf & _
           "Correlation coefficient: " & Format(correlation, "0.0000") & vbCrLf & _
           "Scatter plot created with trendline.", vbInformation
    
End Sub
