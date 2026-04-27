from aiogram.fsm.state import State, StatesGroup


class AdminStates(StatesGroup):
    waiting_source = State()
    waiting_remove_source = State()
    waiting_target = State()
