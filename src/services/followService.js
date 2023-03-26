import axios from 'axios'


export default function followService() {
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL, headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })

    const servises = {

        async follow({ followerId, userId, setDisabled }) {
            setDisabled(true)
            api.post("/follow", { followerId, userId }).then(
                (response) => {
                    setDisabled(false)
                }
            )
                .catch(() => {
                    setDisabled(false)
                })
        },


        async unfollow({ userId, setDisabled }) {
            setDisabled(true)
            return await api.delete(`/follow/${userId}`).then(
                (response) => {
                    setDisabled(false)
                }
            )
                .catch(() => {
                    setDisabled(false)
                })
        },


        async verifyFollow({ userId }) {
            return api.get(`/follow/${userId}`)
        },
        
    }


    return servises;
}