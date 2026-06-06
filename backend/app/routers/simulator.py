from fastapi import APIRouter
from app.schemas.simulator import SimulatorInput, SimulatorResult
from app.services.simulator_service import run_simulation

router = APIRouter(prefix="/v1/users", tags=["simulator"])


@router.post("/{user_id}/simulate", response_model=SimulatorResult)
def simulate(user_id: str, sim_input: SimulatorInput):
    return run_simulation(user_id, sim_input)
