from fastapi import APIRouter, HTTPException
from app.services import agent_service

router = APIRouter(prefix="/v1/users", tags=["agent"])


def _not_found(user_id: str):
    raise HTTPException(
        status_code=404,
        detail=f"Usuario '{user_id}' no encontrado. Usá 'demo' para datos de ejemplo.",
    )


@router.get("/{user_id}/agent/context")
def get_agent_context(user_id: str):
    try:
        return agent_service.build_context(user_id)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/agent/next-best-move")
def get_next_best_move(user_id: str):
    try:
        ctx = agent_service.build_context(user_id)
        return agent_service.build_next_best_move(ctx)
    except ValueError:
        _not_found(user_id)


@router.get("/{user_id}/agent/coach")
def get_agent_coach(user_id: str):
    try:
        return agent_service.build_agent_response(user_id)
    except ValueError:
        _not_found(user_id)
