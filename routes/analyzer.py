#**
# * Use SciKit-Learn to detect Profanity and importance of Project Issues:
# *

# Import dependency modules needed for the task.
import sys, json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearnex import patch_sklearn

patch_sklearn()

json_str = input() # Capture data input

params = json.loads(json_str) # Load parameters values (params) to process

issueTitle = params['title'] # Capture title of project issue

keyword = issueTitle
reference = "README.md edited online with Bitbucket"

words = issueTitle
profanity = "fuck you idiot useless stupid shit ass slut bitch"

# importance comparison
first_comparison = [keyword, reference]

cVect_first = CountVectorizer()
cMatrix_first = cVect_first.fit_transform(first_comparison)

#prints how well the keyword matches as a percentage of importance
matPercent_first = cosine_similarity(cMatrix_first)[0][1]*100
matPercent_first = round(matPercent_first,2) #round to two decimal

# profanity comparison
second_comparison = [words, profanity]

cVect_second = CountVectorizer()
cMatrix_second = cVect_second.fit_transform(second_comparison)

#prints how well the word matches as a percentage of profanity
matPercent_second = cosine_similarity(cMatrix_second)[0][1]*100
matPercent_second = round(matPercent_second,2) #round to two decimal

reject=0 # 1 means reject request, 0 means accept request

if(matPercent_first>50 or matPercent_second>50):
    reject=1

# Results must return valid JSON Object
print(reject)
sys.stdout.flush()

