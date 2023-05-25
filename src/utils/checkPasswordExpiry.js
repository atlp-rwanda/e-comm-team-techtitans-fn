const checkPasswordExpiry = (lastUpdateOfPassword) => {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const lastUpdate = new Date(lastUpdateOfPassword);
    lastUpdate.setHours(lastUpdate.getHours() - 1);
    const diff = (currentTime - lastUpdate.getTime()) / 60000;



    return diff;
};

export default checkPasswordExpiry;
