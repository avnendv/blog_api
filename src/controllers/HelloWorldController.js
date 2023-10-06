const HelloWorldController = async (_req, res, next) => {
  try {
    res.send(
      '<h1 style="text-align: center; margin-top: 100px;">Hello world!<br/>App build with Nodejs/Express by AVNENDV.😜😜😜</h1>'
    );
  } catch (error) {
    next(error);
  }
};

export default HelloWorldController;
