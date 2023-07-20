# Raimei
Raimei, a ride-sharing service idea by Raimei Technologies, Founded by Eric Li

-Market driven price, rider and driver price negotiation rideshare
![IMG_0019](https://github.com/eric97li/Raimei/assets/22551959/24a954af-b85b-40c5-aca3-2f97b8670c07){: width="33%" height="33%"}
![IMG_0021](https://github.com/eric97li/Raimei/assets/22551959/ad33ade3-6908-446d-9aae-02c7c32488bf){: width="33%" height="33%"}
![IMG_0022](https://github.com/eric97li/Raimei/assets/22551959/975da602-5c4d-4b4a-b138-3f436b744b06){: width="33%" height="33%"}
![IMG_0024](https://github.com/eric97li/Raimei/assets/22551959/6fefb276-3945-4b95-9621-09e7f8188876){: width="33%" height="33%"}
![IMG_0026](https://github.com/eric97li/Raimei/assets/22551959/1f1a394a-0548-4d16-a235-485943bad754){: width="33%" height="33%"}
![IMG_0027](https://github.com/eric97li/Raimei/assets/22551959/1a3cfee9-cd8c-4fde-8f9e-f8e63bfe2a05){: width="33%" height="33%"}
![IMG_0028](https://github.com/eric97li/Raimei/assets/22551959/06cdaee3-d108-41c7-a063-593b32a479b0){: width="33%" height="33%"}
![IMG_0029](https://github.com/eric97li/Raimei/assets/22551959/a28972aa-8a1c-4106-b846-5c7c241b0226){: width="33%" height="33%"}
![IMG_0030](https://github.com/eric97li/Raimei/assets/22551959/89bc8048-0d25-4ecd-a72f-6160a9d8eae8){: width="33%" height="33%"}
![IMG_0031](https://github.com/eric97li/Raimei/assets/22551959/0e40c751-3093-4fe1-bf3f-896cb9e4a177){: width="33%" height="33%"}

-Application Functionality Flow Diagram: https://docs.google.com/drawings/d/13hJN__CRhaDoe2R1B7PTy2HWwR9C-2AHEWgfadhvHh4/edit?usp=sharing

-Raimei Home Screen Diagram: https://docs.google.com/drawings/d/14VwOianfPHkCLtZlyalTXnr_cxDEALTlfQiNaHj8z04/edit?usp=sharing

-Driver Offers Screen Diagram: https://docs.google.com/drawings/d/19Z58qU3Shg6Yv3_UiSykVuFB0RfO1H1h6rnaYd4XwPg/edit?usp=sharing

-Riders Queue Screen Diagram: https://docs.google.com/drawings/d/1B6cD15bvTZSUAg2H3NH2fOdXry8gWDhBEmgzTDr-4nI/edit?usp=sharing

# Raimei setup:
Clone the repo, then run:

npm install —legacy-peer-deps 

expo start -c 

Create a billing account in Google Cloud API console and add Places, Directions, and Distance Matrix as APIs. 

Create an API key edit the .env.local file's value for GOOGLE_MAPS_API_KEY

Provide the "let linkString3 = 'key= ' " (line 126 in SetDriverInfoScreen.tsx) with the GOOGLE_MAPS_API_KEY value as well

Download Expo Go from either Google Play or Apple Store to run the app on your phone.
