## React / Tailwind simple Carousel

This straightforward carousel is created with React JS and Tailwind. Utilizing Tailwind can significantly streamline the process of writing CSS classes and enhance the responsiveness of your application with ease.

While there are various approaches to constructing a carousel, employing React and JavaScript plugins is a common practice. However, in this instance, I've harnessed the power of Tailwind features, along with React's hooks and refs, to build the carousel without using any third party plugins

### Set up Basic Reach Boiler Plate using Create react App

You’ll need to have Node >= 14 on your local development machine (but it’s not required on the server). You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

To create a new app, you may choose one of the following methods:

npx
```
# Install Create React App globally if you haven't already
npx create-react-app my-react-app

# Change directory to your newly created app
cd my-react-app

# Start the development server
npm start

```
This will set up a basic React project using Create React App. You can replace "my-react-app" with the desired name for your project. After running these commands, you can open your browser and navigate to http://localhost:3000 to see your basic React app in action.

### Setting up Tailwind CSS in a Create React App project.

https://tailwindcss.com/docs/guides/create-react-app

### Create Carousel component 

Creating a functional component. We will be passing a Json array of image URLs with title as a prop. We can also create a reference of the DOM elements using Ref in react.
.

```javascript=
{
  "resources": [
    {
      "title": "black-adam",
      "imageUrl": "./movies/black-adam.png"
    },
    {
      "title": "dark-knight",
      "imageUrl": "./movies/dark-knight.png"
    },
  ]
} 
```



### Remove unwanted code and CSS from the App.js and App.css and index.js
### Create 2 basic react component callled Carousel.jsx, CarouselItem.jsx
### import the CarouselItem component in to the Carousel component 
### import the Carousel component into App.js
#### create a array of object in the Carousel component (which is the input data for Carousel Item)
### Create a carousel div and an inner div and put the CarouselItem component into it.
### Loop the Item Array using Map function and put the CarouselItem component into the map method
### pass the items as an props to the CarouselItem component
### Recevive the props in the CarouselItem component
### Create a Container div (carousel-item) and add the image tag and pass the URL as the image href and alt as an alt text
### Design Section Outer div and 3 divs for left arrow righ arrow and slider using tailwind css
### Design Right and left Navigation button and add arrows from the icons website https://heroicons.com/
### Now the left right arrow and the Slider div is ready
### Design the Slider Div as an Unorder List (ul) and inside element as List items (li)
### add proper border radius for the innder div and image tag inside the li tag
### Now we are going to set the width of the UL and LI dynamically
### Add overflow-hidden for sliderContainer div so that if we increase the width of the inner slider element it may not over lap the container div

