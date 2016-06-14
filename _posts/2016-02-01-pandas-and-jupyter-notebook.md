---
layout: post
categories: blog
date: 2016-02-01
tags: examples, consumers
redirect_from:
- /consumers/examples/pandas-and-jupyter-notebook.html
title: Data Analysis with Python and pandas using Jupyter Notebook
sidebar: post
type: example
audience: consumer
author: aag6z
icon: fa-bar-chart
---

This guide describes how to use `pandas` and Jupyter notebook to analyze a Socrata dataset. It will cover how to do basic analysis of a dataset using pandas functions and how to transform a dataset by mapping functions. 

## Contents

1. [Installing Python and Jupyter](#installing-python-and-jupyter)
2. [Importing a Dataset Into Jupyter](#importing-a-dataset-into-jupyter)
3. [Basic Analysis of a Dataset](#basic-analysis-of-a-dataset)
4. [Mapping Functions to Transform Data](#mapping-functions-to-transform-data)

### Installing Python and Jupyter

You can run Jupyter notebook in the cloud using a service like [try.jupyter.org](https://try.jupyter.org/) or you can [install and run it locally](http://jupyter.readthedocs.org/en/latest/install.html). You will need [Python](https://www.python.org/downloads/) version 3.3+ or 2.7+. 

### Import a Dataset Into Jupyter

Before we import our sample dataset into the notebook we will import the pandas library. [`pandas`](http://pandas.pydata.org/) is an open source Python library that provides "high-performance, easy-to-use data structures and data analysis tools." 

{% highlight python %}
import pandas as pd
print(pd.__version__)
> 0.17.1
{% endhighlight %}

Next, we will read the following dataset from the Kenya OpenData site: <https://www.opendata.go.ke/Education/Kenya-Primary-Schools/p452-xb7c>

`pandas` provides several methods for reading data in different formats. Here we'll read it in as JSON but you can read in CSV and Excel files as well. 

Note that you can get the help for any method by adding a "?" to the end and running the cell. For example:

{% highlight python %}
pd.read_json?
{% endhighlight %}

The data is returned as a "DataFrame" which is a 2 dimensional spreadsheet-like data structure with columns of different types. `pandas` has two main data structures - `DataFrame` and `Series`. A Series is a one-dimensional array that can hold any value type - This is not necessarily the case but a DataFrame column may be treated as a Series.

Displayed below are the first 5 rows of the DataFrame we imported (to see the last `n` rows use `.tail(n)`).

{% highlight python %}
df = pd.read_json("https://www.opendata.go.ke/resource/p452-xb7c.json")

df.head(5)
{% endhighlight %}

|   | boys_toilets | costituency  | county  | district      | division  | geolocation                                       | girls_toilets | gok_tsc_female | gok_tsc_male | level_of_education | ... | school_institution_type_2 | school_institution_type_3 | sponsor_of_school      | status_of_school | teachers_toilets | total_boys | total_enrolment | total_girls | total_number_of_classrooms | total_toilets |
| - | ------------ | ------------ | ------- | ------------- | --------- | ------------------------------------------------- | ------------- | -------------- | ------------ | ------------------ | --- | ------------------------- | ------------------------- | ---------------------- | ---------------- | ---------------- | ---------- | --------------- | ----------- | -------------------------- | ------------- |
| 0 | 0            | MSAMBWENI    | KWALE   | KWALE         | MSAMBWENI | {'longitude': '39.085658', 'latitude': '-4.248... | 0             | 0              | 0            | PRIMARY SCHOOL     | ... | DAY ONLY                  | ORDINARY                  | CENTRAL GOVERNMENT/DEB | PUBLIC           | 0                | 0          | 839             | 0           | 1                          | 0             |
| 1 | 4            | KISAUNI      | MOMBASA | MOMBASA       | KISAUNI   | {'longitude': '39.6977', 'latitude': '-3.99606... | 4             | 0              | 0            | PRIMARY SCHOOL     | ... | DAY ONLY                  | ORDINARY                  | RELIGIOUS ORGANIZATION | PUBLIC           | 2                | 0          | 736             | 0           | 15                         | 0             |
| 2 | 5            | WEBUYE       | BUNGOMA | BUNGOMA       | CHWELE    | {'longitude': '34.62895', 'latitude': '0.71988... | 6             | 0              | 1            | PRIMARY SCHOOL     | ... | DAY ONLY                  | ORDINARY                  | RELIGIOUS ORGANIZATION | PUBLIC           | 2                | 0          | 624             | 0           | 15                         | 0             |
| 3 | 5            | KISUMU RURAL | KISUMU  | KISUMU        | MASENO    | {'longitude': '34.626806', 'latitude': '-0.056... | 6             | 0              | 0            | PRIMARY SCHOOL     | ... | DAY ONLY                  | ORDINARY                  | RELIGIOUS ORGANIZATION | PUBLIC           | 2                | 0          | 610             | 0           | 9                          | 0             |
| 4 | 4            | BONCHARI     | KISII   | CENTRAL KISII | SUNEKA    | {'longitude': '34.657476', 'latitude': '-0.703... | 4             | 0              | 0            | PRIMARY SCHOOL     | ... | DAY ONLY                  | ORDINARY                  | RELIGIOUS ORGANISATION | PUBLIC           | 2                | 0          | 605             | 0           | 8                          | 0             |

### Basic Analysis of Dataset

pandas has several methods that allow you to quickly analyze a dataset and get an idea of the type and amount of data you are dealing with along with some important statistics. 

- `.shape` - returns the row and column count of a dataset
- `.describe()` - returns statistics about the numerical columns in a dataset 
- `.dtypes` returns the data type of each column


{% highlight python %}
df.shape
    (1000, 35)

df.describe()
{% endhighlight %}

|       | boys_toilets | girls_toilets | gok_tsc_female | gok_tsc_male | local_authority_female | local_authority_male | non_teaching_staff_female | non_teaching_staff_male | others_female | others_male | ... | pta_bog_male | pupil_classroom_ratio | pupil_teacher_ratio | pupil_toilet_ratio | teachers_toilets | total_boys  | total_enrolment | total_girls | total_number_of_classrooms | total_toilets |
| ----- | ------------ | ------------- | -------------- | ------------ | ---------------------- | -------------------- | ------------------------- | ----------------------- | ------------- | ----------- | --- | ------------ | --------------------- | ------------------- | ------------------ | ---------------- | ----------- | --------------- | ----------- | -------------------------- | ------------- |
| count | 1000.000000  | 1000.000000   | 1000.000000    | 1000.000000  | 1000.000000            | 1000.000000          | 1000.000000               | 1000.000000             | 1000.000000   | 1000.00000  | ... | 1000.000000  | 1000.000000           | 1000.000000         | 1000.000000        | 1000.000000      | 1000.000000 | 1000.000000     | 1000.00000  | 1000.000000                | 1000.000000   |
| mean  | 4.716000     | 5.256000      | 2.257000       | 4.300000     | 0.005000               | 0.007000             | 0.620000                  | 1.492000                | 0.044000      | 0.02200     | ... | 0.205000     | 59.877600             | 99.251500           | 68.911000          | 1.861000         | 5.892000    | 571.864000      | 6.85300     | 9.668000                   | 0.110000      |
| std   | 3.864748     | 4.579895      | 3.260611       | 3.092825     | 0.083558               | 0.137732             | 0.913474                  | 1.178696                | 0.346676      | 0.25215     | ... | 0.606088     | 48.285612             | 73.425793           | 65.355348          | 1.714823         | 71.239353   | 371.226201      | 78.77016    | 5.122306                   | 2.107686      |
| min   | 0.000000     | 0.000000      | 0.000000       | 0.000000     | 0.000000               | 0.000000             | 0.000000                  | 0.000000                | 0.000000      | 0.00000     | ... | 0.000000     | 0.000000              | 66.500000           | 0.000000           | 0.000000         | 0.000000    | 67.000000       | 0.00000     | 0.000000                   | 0.000000      |
| 25%   | 2.000000     | 2.000000      | 0.000000       | 1.000000     | 0.000000               | 0.000000             | 0.000000                  | 1.000000                | 0.000000      | 0.00000     | ... | 0.000000     | 40.900000             | 70.400000           | 35.500000          | 1.000000         | 0.000000    | 314.750000      | 0.00000     | 7.000000                   | 0.000000      |
| 50%   | 4.000000     | 4.000000      | 1.000000       | 4.000000     | 0.000000               | 0.000000             | 0.000000                  | 1.000000                | 0.000000      | 0.00000     | ... | 0.000000     | 54.800000             | 76.500000           | 53.350000          | 2.000000         | 0.000000    | 541.500000      | 0.00000     | 9.000000                   | 0.000000      |
| 75%   | 6.000000     | 8.000000      | 3.000000       | 6.000000     | 0.000000               | 0.000000             | 1.000000                  | 2.000000                | 0.000000      | 0.00000     | ... | 0.000000     | 72.000000             | 92.200000           | 83.050000          | 2.000000         | 0.000000    | 730.250000      | 0.00000     | 12.000000                  | 0.000000      |
| max   | 34.000000    | 49.000000     | 26.000000      | 17.000000    | 2.000000               | 4.000000             | 6.000000                  | 9.000000                | 5.000000      | 5.00000     | ... | 6.000000     | 839.000000            | 839.000000          | 741.500000         | 32.000000        | 1233.000000 | 2880.000000     | 1312.00000  | 42.000000                  | 45.000000     |

You can also run the .describe method with the "include='all'" flag to get statistics on the non-numeric column types. In this example we have to drop the "geolocation" column because the .describe method doesn't accept dictionary objects.


{% highlight python %}
df.drop("geolocation", axis=1).describe(include="all")
{% endhighlight %}

|        | boys_toilets | costituency | county | district | division  | girls_toilets | gok_tsc_female | gok_tsc_male | level_of_education | local_authority_female | ... | school_institution_type_2 | school_institution_type_3 | sponsor_of_school      | status_of_school | teachers_toilets | total_boys  | total_enrolment | total_girls | total_number_of_classrooms | total_toilets |
| ------ | ------------ | ----------- | ------ | -------- | --------- | ------------- | -------------- | ------------ | ------------------ | ---------------------- | --- | ------------------------- | ------------------------- | ---------------------- | ---------------- | ---------------- | ----------- | --------------- | ----------- | -------------------------- | ------------- |
| count  | 1000.000000  | 1000        | 1000   | 1000     | 1000      | 1000.000000   | 1000.000000    | 1000.000000  | 1000               | 1000.000000            | ... | 1000                      | 1000                      | 999                    | 1000             | 1000.000000      | 1000.000000 | 1000.000000     | 1000.00000  | 1000.000000                | 1000.000000   |
| unique | NaN          | 361         | 47     | 69       | 309       | NaN           | NaN            | NaN          | 1                  | NaN                    | ... | 3                         | 3                         | 10                     | 2                | NaN              | NaN         | NaN             | NaN         | NaN                        | NaN           |
| top    | NaN          | BAHARI      | NAROK  | NAKURU   | KIRINDONI | NaN           | NaN            | NaN          | PRIMARY SCHOOL     | NaN                    | ... | DAY ONLY                  | ORDINARY                  | RELIGIOUS ORGANIZATION | PUBLIC           | NaN              | NaN         | NaN             | NaN         | NaN                        | NaN           |
| freq   | NaN          | 25          | 92     | 85       | 22        | NaN           | NaN            | NaN          | 1000               | NaN                    | ... | 950                       | 947                       | 486                    | 963              | NaN              | NaN         | NaN             | NaN         | NaN                        | NaN           |
| mean   | 4.716000     | NaN         | NaN    | NaN      | NaN       | 5.256000      | 2.257000       | 4.300000     | NaN                | 0.005000               | ... | NaN                       | NaN                       | NaN                    | NaN              | 1.861000         | 5.892000    | 571.864000      | 6.85300     | 9.668000                   | 0.110000      |
| std    | 3.864748     | NaN         | NaN    | NaN      | NaN       | 4.579895      | 3.260611       | 3.092825     | NaN                | 0.083558               | ... | NaN                       | NaN                       | NaN                    | NaN              | 1.714823         | 71.239353   | 371.226201      | 78.77016    | 5.122306                   | 2.107686      |
| min    | 0.000000     | NaN         | NaN    | NaN      | NaN       | 0.000000      | 0.000000       | 0.000000     | NaN                | 0.000000               | ... | NaN                       | NaN                       | NaN                    | NaN              | 0.000000         | 0.000000    | 67.000000       | 0.00000     | 0.000000                   | 0.000000      |
| 25%    | 2.000000     | NaN         | NaN    | NaN      | NaN       | 2.000000      | 0.000000       | 1.000000     | NaN                | 0.000000               | ... | NaN                       | NaN                       | NaN                    | NaN              | 1.000000         | 0.000000    | 314.750000      | 0.00000     | 7.000000                   | 0.000000      |
| 50%    | 4.000000     | NaN         | NaN    | NaN      | NaN       | 4.000000      | 1.000000       | 4.000000     | NaN                | 0.000000               | ... | NaN                       | NaN                       | NaN                    | NaN              | 2.000000         | 0.000000    | 541.500000      | 0.00000     | 9.000000                   | 0.000000      |
| 75%    | 6.000000     | NaN         | NaN    | NaN      | NaN       | 8.000000      | 3.000000       | 6.000000     | NaN                | 0.000000               | ... | NaN                       | NaN                       | NaN                    | NaN              | 2.000000         | 0.000000    | 730.250000      | 0.00000     | 12.000000                  | 0.000000      |
| max    | 34.000000    | NaN         | NaN    | NaN      | NaN       | 49.000000     | 26.000000      | 17.000000    | NaN                | 2.000000               | ... | NaN                       | NaN                       | NaN                    | NaN              | 32.000000        | 1233.000000 | 2880.000000     | 1312.00000  | 42.000000                  | 45.000000     |

{% highlight python %}
df.dtypes

    boys_toilets                    int64
    costituency                    object
    county                         object
    district                       object
    division                       object
    geolocation                    object
    girls_toilets                   int64
    gok_tsc_female                  int64
    gok_tsc_male                    int64
    level_of_education             object
    local_authority_female          int64
    local_authority_male            int64
    location                       object
    name_of_school                 object
    non_teaching_staff_female       int64
    non_teaching_staff_male         int64
    others_female                   int64
    others_male                     int64
    province                       object
    pta_bog_female                  int64
    pta_bog_male                    int64
    pupil_classroom_ratio         float64
    pupil_teacher_ratio           float64
    pupil_toilet_ratio            float64
    school_institution_type_1      object
    school_institution_type_2      object
    school_institution_type_3      object
    sponsor_of_school              object
    status_of_school               object
    teachers_toilets                int64
    total_boys                      int64
    total_enrolment                 int64
    total_girls                     int64
    total_number_of_classrooms      int64
    total_toilets                   int64
    dtype: object
{% endhighlight %}



Here are some additional methods that can give you statistics of a DataFrame or particular column in a DataFrame.

- `.mean(axis=0 [will give you the calculated value per column])` - returns the statistical mean 
- `.median(axis=0 [will give you the calculated value per column])` - returns the statistical median 
- `.mode(axis=0 [will give you the calculated value per column])` - returns the statistical mode
- `.count()` - gives number of total values in column
- `.unique()` - returns array of all unique values in that column
- `.value_counts()` - returns object containing counts of unique values


{% highlight python %}
df.boys_toilets.mean()
    4.716

df.girls_toilets.count()
    1000

df.district.unique()

    array(['KWALE', 'MOMBASA', 'BUNGOMA', 'KISUMU', 'CENTRAL KISII', 'VIHIGA',
           'HOMA BAY', 'NYAMIRA', 'KILIFI', 'TAITA TAVETA', 'GUCHA',
           'KAKAMEGA', 'BUTERE/MUMIAS', 'SUBA', 'KITUI', 'MERU NORTH', 'IJARA',
           'NAIROBI', 'EMBU', 'MACHAKOS', 'MARSABIT', 'UASIN GISHU',
           'MT ELGON', 'TURKANA', 'MANDERA', 'THIKA', 'NYERI', 'NAROK',
           'NAKURU', 'LUGARI', 'SIAYA', 'KAJIADO', 'LAIKIPIA', 'MBEERE',
           'KERICHO', 'MAKUENI', 'MOYALE', 'BONDO', 'RACHUONYO', 'NYANDO',
           'MARAKWET', 'BURETI', 'WAJIR', 'ISIOLO', 'WEST POKOT', 'MIGORI',
           'BUSIA', 'BARINGO', 'GARISSA', 'TANA RIVER', 'BOMET', 'TRANS MARA',
           'TRANS NZOIA', 'MERU CENTRAL', 'NANDI NORTH', 'MERU SOUTH',
           'NANDI SOUTH', 'KIAMBU', 'KURIA', 'MALINDI', 'MURANGA', 'LAMU',
           'SAMBURU', 'MWINGI', 'NYANDARUA', 'TESO', 'KIRINYAGA', 'MARAGUA',
           'THARAKA'], dtype=object)

df.girls_toilets.value_counts()

    4     157
    1     121
    2     121
    6     100
    8      95
    3      80
    5      69
    0      63
    7      37
    10     31
    9      28
    12     27
    11     12
    13     10
    16     10
    14      9
    15      7
    20      6
    18      5
    22      3
    17      2
    25      2
    42      1
    19      1
    21      1
    31      1
    49      1
    Name: girls_toilets, dtype: int64
{% endhighlight %}

### Mapping Functions to Transform Data

Often times we need to apply a function to a column in a dataset to transform it. `pandas` makes it easy to do with the .apply() method. In this example, we will map the values in the "status_of_school" column to either a "1" or "0" depending on the value. We will append this information to the DataFrame in a new column.


{% highlight python %}
def mapSchool(x):
    if x == "PUBLIC":
        return 1
    else:
        return 0

df['school_mapped_value'] = df.status_of_school.apply(mapSchool)

df.school_mapped_value.value_counts()

    1    963
    0     37
    Name: school_mapped_value, dtype: int64
{% endhighlight %}

We could have also accomplished the same thing in a lambda function in the following way

{% highlight python %}
df['school_mapped_value_lambda'] = df.status_of_school.apply(lambda y: 1 if y == "PUBLIC" else 0)

df.school_mapped_value_lambda.value_counts()

    1    963
    0     37
    Name: school_mapped_value_lambda, dtype: int64

{% endhighlight %}

This example is also available as a [downloadable Jupyter Notebook](/files/pandas-and-jupyter-notebook.ipynb).
