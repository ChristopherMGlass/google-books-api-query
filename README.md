# Query with Google Books API

This is a website that displays a simple form to collect information from a user and uses that to query the Google Books API.  

## Design Stratgy used
This implementation consists of a all client side solution hosted by a simple Node Express app.  The UI is designed to be "quick and dirty". Both decisions are inteded to keep the soution light waeight and simple. I elected not to utilize a UI framework like React primarily for simplicty.  If the UI was likely to get more complicated I would likley use React.

The implemnetation was built from the API out. The goal was to create a simple set of interface functions that could be called by a form. BEcuase the the API interface was lightweight enough I elected not to call the api from the server but to instead call it from the client side.  Given the nature of the project I am not partiuclarly concerned about exposing the API key.  Additionally, there is no reason for anybody to use it, as an equivalent one is available from Google free of charge.

I have made note of multiple way performance can be improved, some are more likely to be useful than others but I elected not to implement them at this time to avoid preoptimization pitfalls.

## How TO Use

The usage is pretty simple. To start the application, on the desreid hosting server simply run 

``node server.js [port]`` 

Where ``port`` is optional and a random port will be assigned if omitted.  This will begin hosting the service on the desired port.  Simply navigate to the hosting server on your bowser to load the page.

An example of this code is hosted is view able at

[COMMING SOON]