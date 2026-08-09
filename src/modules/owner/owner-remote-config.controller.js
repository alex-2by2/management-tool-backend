const service =
  require(
    '../remote-config/remote-config.service',
  );

async function list(
  request,
  response,
  next,
) {
  try {
    const configs =
      await service.ownerList();

    return response.json({
      success: true,
      data: {
        configs,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function update(
  request,
  response,
  next,
) {
  try {
    const {
      key,
      value,
      type,
      description,
      enabled,
    } = request.body;

    const config =
      await service.update({
        key,
        value,
        type,
        description,
        enabled,
        userId:
          request.auth.userId,
        request,
      });

    return response.json({
      success: true,
      data: {
        config,
      },
    });
  } catch (error) {
    return next(error);
  }
}

async function remove(
  request,
  response,
  next,
) {
  try {
    const result =
      await service.remove({
        key:
          request.params.key,
        userId:
          request.auth.userId,
        request,
      });

    return response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  list,
  update,
  remove,
};
