import Chat from '../../db/models/Chat'

const setViewedState = async (req: Request, res: Response) => {
  try {
    const { userId, senderId } = req.params

    if (!userId || !senderId) {
      throw new Error('All fields are required (userId, senderId).')
    }

    const result = await Chat.updateMany(
      { sender: senderId, receiver: userId, viewed: false },
      { $set: { viewed: true } }
    )

    return res.status(200).json({ message: `Messages from ${userId} set as viewed` })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message, error: 'Set Viewed State' })
    } else {
      return res.status(500).json({ message: 'An unexpected error occurred', error: 'Set Viewed State' })
    }
  }
}

export { setViewedState }