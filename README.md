# Raimei
Raimei, a ride-sharing service idea by Raimei Technologies, Founded by Eric Li

-Market driven price, rider and driver price negotiation rideshare

| Login Page                            | Signup Page                           | Home Page                                     |
| ----------------------------------- | ----------------------------------- | ------------------------------------------- |
| ![IMG_0019_50](https://github.com/eric97li/Raimei/assets/22551959/6c6eeeb3-4028-4350-b6c8-03a7afb212cd) | ![IMG_0021_1_50](https://github.com/eric97li/Raimei/assets/22551959/0b7b9601-770b-40c5-be4e-b763ceb7f4f8) | ![IMG_0022_50](https://github.com/eric97li/Raimei/assets/22551959/d4c7968e-8b65-4db4-9983-c24d127df30f) |

| Home Page: Select Time                            | Update Info                            | Select Ride Type, Inputs                                     |
| ----------------------------------- | ----------------------------------- | ------------------------------------------- |
|  ![IMG_0024_50](https://github.com/eric97li/Raimei/assets/22551959/cff5e7c2-55c3-4c75-afbb-933faefb05ed) | ![IMG_0026_50](https://github.com/eric97li/Raimei/assets/22551959/6e4eced8-d08c-48ea-87e5-74a75ed4295b) |  ![IMG_0027_50](https://github.com/eric97li/Raimei/assets/22551959/138745a7-0677-44f2-b4d4-5270b9d030d4)
|

| Ride Requests/Drive Offers (In Progress)                            | Ride Requests/Drive Offers Expanded Details (In Progress)                            | Reserve Requests/Drive Offers Expanded Details (In Progress)                                    |
| ----------------------------------- | ----------------------------------- | ------------------------------------------- |
|  ![IMG_0028_50](https://github.com/eric97li/Raimei/assets/22551959/f591204e-18fa-4711-aa39-611c5b85c832) | ![IMG_0029_50](https://github.com/eric97li/Raimei/assets/22551959/b92f524f-0b5b-42a4-898b-2684dccf29cb) |  ![IMG_0030_50](https://github.com/eric97li/Raimei/assets/22551959/1d0cf748-9ebb-421f-a1bb-803ac4103f55) |


# Raimei Diagrams
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
